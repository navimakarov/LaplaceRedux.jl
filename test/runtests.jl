using LaplaceRedux
using Test

@testset "LaplaceRedux.jl" begin
    @testset "Data" begin
        include("data.jl")
    end

    @testset "Curvature" begin
        include("curvature.jl")
    end

    @testset "Laplace" begin
        include("laplace.jl")
    end

    @testset "PyTorch Comparisons" begin
        include("pytorch_comparison.jl")
    end

    @testset "Kron" begin
        include("kron.jl")
    end

    @testset "KronDecomposed" begin
        include("krondecomposed.jl")
    end

    @testset "MLJFlux" begin
        include("mlj_flux_interfacing.jl")
    end
end
