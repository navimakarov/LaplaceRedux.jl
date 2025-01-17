using LinearAlgebra

"Abstract base type for all Laplace approximations in this library"
abstract type BaseLaplace end
# NOTE: all subclasses implemented are parametric.
# If functional LA is implemented, it may make sense to add another layer of interface-inheritance

"""
    outdim(la::BaseLaplace)

Helper function to determine the output dimension, corresponding to the number of neurons 
on the last layer of the NN, of a `Flux.Chain` with Laplace approximation.
"""
outdim(la::BaseLaplace) = la.n_out

"""
    get_params(la::BaseLaplace) 

Retrieves the desired (sub)set of model parameters and stores them in a list.

# Examples

```julia-repl
using Flux, LaplaceRedux
# define a neural network with one hidden layer that takes a two-dimensional input and produces a one-dimensional output
nn = Chain(Dense(2,1))
la = Laplace(nn)
LaplaceRedux.get_params(la)
```

"""
function get_params(la::BaseLaplace)
    nn = la.model
    params = Flux.params(nn)
    n_elements = length(params)
    if la.subset_of_weights == :all || la.subset_of_weights == :subnetwork
        # get all parameters and constants in logitbinarycrossentropy
        params = [θ for θ in params]
    elseif la.subset_of_weights == :last_layer
        # Only get last layer parameters:
        # params[n_elements] is the bias vector of the last layer
        # params[n_elements-1] is the weight matrix of the last layer
        params = [params[n_elements - 1], params[n_elements]]
    end
    return params
end

@doc raw"""
    posterior_precision(la::BaseLaplace)

Computes the posterior precision ``P`` for a fitted Laplace Approximation as follows,

``
P = \sum_{n=1}^N\nabla_{\theta}^2\log p(\mathcal{D}_n|\theta)|_{\theta}_{MAP} + \nabla_{\theta}^2 \log p(\theta)|_{\theta}_{MAP} 
``

where ``\sum_{n=1}^N\nabla_{\theta}^2\log p(\mathcal{D}_n|\theta)|_{\theta}_{MAP}=H`` and ``\nabla_{\theta}^2 \log p(\theta)|_{\theta}_{MAP}=P_0``.
"""
function posterior_precision(la::BaseLaplace, H=la.H, P₀=la.P₀)
    @assert !isnothing(H) "Hessian not available. Either no value supplied or Laplace Approximation has not yet been estimated."
    return H + P₀
end

@doc raw"""
    posterior_covariance(la::BaseLaplace, P=la.P)

Computes the posterior covariance ``∑`` as the inverse of the posterior precision: ``\Sigma=P^{-1}``.
"""
function posterior_covariance(la::BaseLaplace, P=posterior_precision(la))
    @assert !isnothing(P) "Posterior precision not available. Either no value supplied or Laplace Approximation has not yet been estimated."
    return inv(P)
end

"""
    log_likelihood(la::BaseLaplace)


"""
function log_likelihood(la::BaseLaplace)
    factor = -_H_factor(la)
    if la.likelihood == :regression
        c = la.n_data * la.n_out * log(la.σ * sqrt(2 * pi))
    else
        c = 0
    end
    return factor * la.loss - c
end

"""
    _H_factor(la::BaseLaplace)

Returns the factor σ⁻², where σ is used in the zero-centered Gaussian prior p(θ) = N(θ;0,σ²I)
"""
_H_factor(la::BaseLaplace) = 1 / (la.σ^2)

"""
    _init_H(la::BaseLaplace)


"""
_init_H(la::BaseLaplace) = zeros(la.n_params, la.n_params)

"""
    _weight_penalty(la::BaseLaplace)

The weight penalty term is a regularization term used to prevent overfitting.
Weight regularization methods such as weight decay introduce a penalty to the loss function when training a neural network to encourage the network to use small weights.
Smaller weights in a neural network can result in a model that is more stable and less likely to overfit the training dataset, in turn having better performance when 
making a prediction on new data.
"""
function _weight_penalty(la::BaseLaplace)
    μ = la.μ                                                                 # MAP
    μ₀ = la.μ₀                                                               # prior
    Δ = μ .- μ₀
    return Δ'la.P₀ * Δ                                                       # measure of how far the MAP estimate deviates from the prior mean μ₀
end                                                                          # used to control the degree of regularization applied to the mode

"""
    log_marginal_likelihood(la::BaseLaplace; P₀::Union{Nothing,UniformScaling}=nothing, σ::Union{Nothing, Real}=nothing)


"""
function log_marginal_likelihood(
    la::BaseLaplace;
    P₀::Union{Nothing,AbstractFloat,AbstractMatrix}=nothing,
    σ::Union{Nothing,Real}=nothing,
)

    # update prior precision:
    if !isnothing(P₀)
        la.P₀ = typeof(P₀) <: AbstractFloat ? UniformScaling(P₀)(la.n_params) : P₀
    end

    # update observation noise:
    if !isnothing(σ)
        @assert (la.likelihood == :regression || la.σ == σ) "Can only change observational noise σ for regression."
        la.σ = σ
    end

    return log_likelihood(la) - 0.5 * (log_det_ratio(la) + _weight_penalty(la))
end

"""
    log_det_ratio(la::BaseLaplace)


"""
function log_det_ratio(la::BaseLaplace)
    return log_det_posterior_precision(la) - log_det_prior_precision(la)
end

"""
    log_det_prior_precision(la::Laplace)


"""
log_det_prior_precision(la::BaseLaplace) = sum(log.(diag(la.P₀)))

"""
    log_det_posterior_precision(la::Laplace)


"""
log_det_posterior_precision(la::BaseLaplace) = logdet(posterior_precision(la))
