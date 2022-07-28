var documenterSearchIndex = {"docs":
[{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"CurrentModule = LaplaceRedux","category":"page"},{"location":"tutorials/mlp/#Bayesian-MLP","page":"MLP","title":"Bayesian MLP","text":"","category":"section"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"This time we use a synthetic dataset containing samples that are not linearly separable:","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"# Number of points to generate.\nxs, ys = toy_data_non_linear(200)\nX = hcat(xs...) # bring into tabular format\ndata = zip(xs,ys)","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"For the classification task we build a neural network with weight decay composed of a single hidden layer.","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"n_hidden = 32\nD = size(X)[1]\nnn = Chain(\n    Dense(D, n_hidden, σ),\n    Dense(n_hidden, 1)\n)  \nλ = 0.01\nsqnorm(x) = sum(abs2, x)\nweight_regularization(λ=λ) = 1/2 * λ^2 * sum(sqnorm, Flux.params(nn))\nloss(x, y) = Flux.Losses.logitbinarycrossentropy(nn(x), y) + weight_regularization();","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"The model is trained for 200 epochs before the training loss stagnates.","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"using Flux.Optimise: update!, ADAM\nopt = ADAM()\nepochs = 200\navg_loss(data) = mean(map(d -> loss(d[1],d[2]), data))\nshow_every = epochs/10\n\nfor epoch = 1:epochs\n  for d in data\n    gs = gradient(params(nn)) do\n      l = loss(d...)\n    end\n    update!(opt, params(nn), gs)\n  end\n  if epoch % show_every == 0\n    println(\"Epoch \" * string(epoch))\n    @show avg_loss(data)\n  end\nend","category":"page"},{"location":"tutorials/mlp/#Laplace-appoximation","page":"MLP","title":"Laplace appoximation","text":"","category":"section"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"Laplace approximation can be implemented as follows:","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"la = Laplace(nn, λ=λ, subset_of_weights=:last_layer)\nfit!(la, data)","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"The plot below shows the resulting posterior predictive surface for the plugin estimator (left) and the Laplace approximation (right).","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"# Plot the posterior distribution with a contour plot.\nzoom=0\np_plugin = plot_contour(X',ys,la;title=\"Plugin\",type=:plugin,zoom=zoom)\np_laplace = plot_contour(X',ys,la;title=\"Laplace\",zoom=zoom)\nplt = plot(p_plugin, p_laplace, layout=(1,2), size=(1000,400))\nsavefig(plt, joinpath(www_path, \"posterior_predictive_mlp.png\"))","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"(Image: )","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"Zooming out we can note that the plugin estimator produces high-confidence estimates in regions scarce of any samples. The Laplace approximation is much more conservative about these regions.","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"zoom=-50\np_plugin = plot_contour(X',ys,la;title=\"Plugin\",type=:plugin,zoom=zoom)\np_laplace = plot_contour(X',ys,la;title=\"Laplace\",zoom=zoom)\n# Plot the posterior distribution with a contour plot.\nplt = plot(p_plugin, p_laplace, layout=(1,2), size=(1000,400))\nsavefig(plt, joinpath(www_path, \"posterior_predictive_mlp_zoomed.png\"))","category":"page"},{"location":"tutorials/mlp/","page":"MLP","title":"MLP","text":"(Image: )","category":"page"},{"location":"resources/resources/#Additional-Resources","page":"Additional Resources","title":"Additional Resources","text":"","category":"section"},{"location":"resources/resources/#JuliaCon-2022","page":"Additional Resources","title":"JuliaCon 2022","text":"","category":"section"},{"location":"resources/resources/","page":"Additional Resources","title":"Additional Resources","text":"Slides: link","category":"page"},{"location":"resources/resources/","page":"Additional Resources","title":"Additional Resources","text":"<iframe style=\"width:560px;height:315px\" src=\"https://www.paltmeyer.com/LaplaceRedux.jl/dev/resources/juliacon22/presentation.html\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>","category":"page"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"CurrentModule = LaplaceRedux","category":"page"},{"location":"tutorials/logit/#Bayesian-Logisitic-Regression","page":"Logistic Regression","title":"Bayesian Logisitic Regression","text":"","category":"section"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"We will use synthetic data with linearly separable samples:","category":"page"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"# Number of points to generate.\nxs, ys = toy_data_linear(100)\nX = hcat(xs...) # bring into tabular format\ndata = zip(xs,ys)","category":"page"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"Logisitic regression with weight decay can be implemented in Flux.jl as a single dense (linear) layer with binary logit crossentropy loss:","category":"page"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"nn = Chain(Dense(2,1))\nλ = 0.5\nsqnorm(x) = sum(abs2, x)\nweight_regularization(λ=λ) = 1/2 * λ^2 * sum(sqnorm, Flux.params(nn))\nloss(x, y) = Flux.Losses.logitbinarycrossentropy(nn(x), y) + weight_regularization()","category":"page"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"The code below simply trains the model. After about 50 training epochs training loss stagnates.","category":"page"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"using Flux.Optimise: update!, ADAM\nopt = ADAM()\nepochs = 50\navg_loss(data) = mean(map(d -> loss(d[1],d[2]), data))\nshow_every = epochs/10\n\nfor epoch = 1:epochs\n  for d in data\n    gs = gradient(params(nn)) do\n      l = loss(d...)\n    end\n    update!(opt, params(nn), gs)\n  end\n  if epoch % show_every == 0\n    println(\"Epoch \" * string(epoch))\n    @show avg_loss(data)\n  end\nend","category":"page"},{"location":"tutorials/logit/#Laplace-appoximation","page":"Logistic Regression","title":"Laplace appoximation","text":"","category":"section"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"Laplace approximation for the posterior predictive can be implemented as follows:","category":"page"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"la = Laplace(nn, λ=λ, subset_of_weights=:last_layer)\nfit!(la, data)","category":"page"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"The plot below shows the resulting posterior predictive surface for the plugin estimator (left) and the Laplace approximation (right).","category":"page"},{"location":"tutorials/logit/","page":"Logistic Regression","title":"Logistic Regression","text":"(Image: )","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"CurrentModule = LaplaceRedux","category":"page"},{"location":"reference/#All-functions-and-types","page":"Reference","title":"All functions and types","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"","category":"page"},{"location":"reference/#Exported-functions","page":"Reference","title":"Exported functions","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [\n    LaplaceRedux,\n    LaplaceRedux.Curvature\n]\nPrivate = false","category":"page"},{"location":"reference/#LaplaceRedux.Laplace-Tuple{Any}","page":"Reference","title":"LaplaceRedux.Laplace","text":"Laplace(model::Any; loss_type=:logitbinarycrossentropy, subset_of_weights=:last_layer, hessian_structure=:full,backend=:EmpiricalFisher,λ=1)\n\nWrapper function to prepare Laplace approximation.\n\nExamples\n\nusing Flux, LaplaceRedux\nnn = Chain(Dense(2,1))\nla = Laplace(nn)\n\n\n\n\n\n","category":"method"},{"location":"reference/#LaplaceRedux.fit!-Tuple{Laplace, Any}","page":"Reference","title":"LaplaceRedux.fit!","text":"fit!(la::Laplace,data)\n\nFits the Laplace approximation for a data set.\n\nExamples\n\nusing Flux, LaplaceRedux\nx, y = LaplaceRedux.Data.toy_data_linear()\ndata = zip(x,y)\nnn = Chain(Dense(2,1))\nla = Laplace(nn)\nfit!(la, data)\n\n\n\n\n\n","category":"method"},{"location":"reference/#LaplaceRedux.plugin-Tuple{Laplace, AbstractArray}","page":"Reference","title":"LaplaceRedux.plugin","text":"plugin(la::Laplace, X::AbstractArray)\n\nComputes the plugin estimate.\n\n\n\n\n\n","category":"method"},{"location":"reference/#LaplaceRedux.predict-Tuple{Laplace, AbstractArray}","page":"Reference","title":"LaplaceRedux.predict","text":"predict(la::Laplace, X::AbstractArray; link_approx=:probit)\n\nComputes predictions from Bayesian neural network.\n\nExamples\n\nusing Flux, LaplaceRedux\nx, y = toy_data_linear()\ndata = zip(x,y)\nnn = Chain(Dense(2,1))\nla = Laplace(nn)\nfit!(la, data)\npredict(la, hcat(x...))\n\n\n\n\n\n","category":"method"},{"location":"reference/#Internal-functions","page":"Reference","title":"Internal functions","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [\n    LaplaceRedux,\n    LaplaceRedux.Curvature\n]\nPublic = false","category":"page"},{"location":"reference/#LaplaceRedux.get_params-Tuple{Laplace}","page":"Reference","title":"LaplaceRedux.get_params","text":"get_params(la::Laplace)\n\nRetrieves the desired (sub)set of model parameters and stores them in a list.\n\nExamples\n\nusing Flux, LaplaceRedux\nnn = Chain(Dense(2,1))\nla = Laplace(nn)\nLaplaceRedux.get_params(la)\n\n\n\n\n\n","category":"method"},{"location":"reference/#LaplaceRedux.glm_predictive_distribution-Tuple{Laplace, AbstractArray}","page":"Reference","title":"LaplaceRedux.glm_predictive_distribution","text":"glm_predictive_distribution(la::Laplace, X::AbstractArray)\n\nComputes the linearized GLM predictive.\n\n\n\n\n\n","category":"method"},{"location":"reference/#LaplaceRedux.hessian_approximation-Tuple{Laplace, Any}","page":"Reference","title":"LaplaceRedux.hessian_approximation","text":"hessian_approximation(la::Laplace, d)\n\nComputes the local Hessian approximation at a single data d.\n\n\n\n\n\n","category":"method"},{"location":"reference/#LaplaceRedux.optimize_prior_precision-Tuple{Laplace}","page":"Reference","title":"LaplaceRedux.optimize_prior_precision","text":"optimize_prior_precision(la::Laplace; n_steps=100, lr=1e-1, init_prior_prec=1.)\n\nOptimize the prior precision post-hoc through empirical Bayes (marginal log-likelihood maximization).\n\n\n\n\n\n","category":"method"},{"location":"reference/#LaplaceRedux.predictive_variance-Tuple{Laplace, Any}","page":"Reference","title":"LaplaceRedux.predictive_variance","text":"predictive_variance(la::Laplace,𝐉)\n\nCompute the linearized GLM predictive variance as 𝐉ₙΣ𝐉ₙ' where 𝐉=∇f(x;θ)|θ̂ is the Jacobian evaluated at the MAP estimate and Σ = H⁻¹.\n\n\n\n\n\n","category":"method"},{"location":"reference/#LaplaceRedux.Curvature.full-Tuple{LaplaceRedux.Curvature.EmpiricalFisher, Tuple}","page":"Reference","title":"LaplaceRedux.Curvature.full","text":"full(curvature::EmpiricalFisher, d::Union{Tuple,NamedTuple})\n\nCompute the full empirical Fisher.\n\n\n\n\n\n","category":"method"},{"location":"reference/#LaplaceRedux.Curvature.gradients-Tuple{LaplaceRedux.Curvature.CurvatureInterface, AbstractArray, Number}","page":"Reference","title":"LaplaceRedux.Curvature.gradients","text":"gradients(curvature::CurvatureInterface, X::AbstractArray, y::Number)\n\nCompute the gradients with respect to the loss function: ∇ℓ(f(x;θ),y) where f: ℝᴰ ↦ ℝᴷ.\n\n\n\n\n\n","category":"method"},{"location":"reference/#LaplaceRedux.Curvature.jacobians-Tuple{LaplaceRedux.Curvature.CurvatureInterface, AbstractArray}","page":"Reference","title":"LaplaceRedux.Curvature.jacobians","text":"jacobians(curvature::CurvatureInterface, X::AbstractArray)\n\nComputes the Jacobian ∇f(x;θ) where f: ℝᴰ ↦ ℝᴷ.\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = LaplaceRedux","category":"page"},{"location":"#LaplaceRedux","page":"Home","title":"LaplaceRedux","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for LaplaceRedux.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This is a small library that can be used for effortless Bayesian Deep Learning and Logisitic Regression trough Laplace Approximation. It is inspired by this Python library and its companion paper.","category":"page"},{"location":"#News","page":"Home","title":"News 📣","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"JuliaCon 2022: This project will be presented at JuliaCon 2022 in July 2022. See here for the preliminary slide pack: [html]","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package is not registered, but can be installed from Github as follows:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"https://github.com/pat-alt/LaplaceRedux.jl\")","category":"page"},{"location":"#Getting-started","page":"Home","title":"Getting started","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Laplace approximation can be used post-hoc for any trained neural network. This library should be compatible with any pre-trained Flux.jl model. Let nn be one such model trained on dataset data. Then implementing Laplace approximation is easy as follows:","category":"page"},{"location":"","page":"Home","title":"Home","text":"la = Laplace(nn)\nfit!(la, data)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Calling predict(nn,X) for some features X will produce posterior predictions. The plot below has been lifted from the documentation, which provides more detail. It shows the resulting posterior predictive surface for the plugin estimator (left) and the Laplace approximation (right) for a toy data set.","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: )","category":"page"},{"location":"#Limitations.","page":"Home","title":"Limitations.","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This library currently offers native support only for models composed and trained in Flux. It is also limited to binary classification problems. Finally, it also requires additional testing.","category":"page"}]
}
