``` @meta
CurrentModule = LaplaceRedux
```

# LaplaceRedux

Documentation for [LaplaceRedux.jl](https://github.com/pat-alt/LaplaceRedux.jl).

This is a small library that can be used for effortless Bayesian Deep Learning and Logisitic Regression trough Laplace Approximation. It is inspired by this Python [library](https://aleximmer.github.io/Laplace/index.html#setup) and its companion [paper](https://arxiv.org/abs/2106.14806).

## Installation

This package is not registered, but can be installed from Github as follows:

``` julia
using Pkg
Pkg.add("https://github.com/pat-alt/LaplaceRedux.jl")
```

## Getting started

Laplace approximation can be used post-hoc for any trained neural network. This library should be compatible with any pre-trained Flux.jl model. Let `nn` be one such model trained on dataset `data`. Then implementing Laplace approximation is easy as follows:

``` julia
la = Laplace(nn)
fit!(la, data)
```

Calling `predict(nn,X)` for some features `X` will produce posterior predictions. The plot below has been lifted from the [documentation](https://www.paltmeyer.com/LaplaceRedux.jl/dev/), which provides more detail. It shows the resulting posterior predictive surface for the plugin estimator (left) and the Laplace approximation (right) for a toy data set.

![](https://raw.githubusercontent.com/pat-alt/LaplaceRedux.jl/main/docs/src/tutorials/www/posterior_predictive_mlp.png)

## Limitations and Goals.

This library currently offers native support only for models composed and trained in Flux. It is also limited to binary classification problems.