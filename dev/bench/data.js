window.BENCHMARK_DATA = {
  "lastUpdate": 1687455640052,
  "repoUrl": "https://github.com/navimakarov/LaplaceRedux.jl",
  "entries": {
    "Julia benchmark result": [
      {
        "commit": {
          "author": {
            "name": "navimakarov",
            "username": "navimakarov"
          },
          "committer": {
            "name": "navimakarov",
            "username": "navimakarov"
          },
          "id": "3f8725e3742ec3c803af8b6144772d885d10c387",
          "message": "Draft: Attept to fix error",
          "timestamp": "2023-05-31T20:38:56Z",
          "url": "https://github.com/navimakarov/LaplaceRedux.jl/pull/39/commits/3f8725e3742ec3c803af8b6144772d885d10c387"
        },
        "date": 1687455636418,
        "tool": "julia",
        "benches": [
          {
            "name": "fit_la_batched",
            "value": 357535858.5,
            "unit": "ns",
            "extra": "gctime=47601903.5\nmemory=1061381648\nallocs=1457837\nparams={\"gctrial\":true,\"time_tolerance\":0.05,\"samples\":10000,\"evals\":1,\"gcsample\":false,\"seconds\":5,\"overhead\":0,\"memory_tolerance\":0.01}"
          },
          {
            "name": "fit_la_unbatched",
            "value": 688504872,
            "unit": "ns",
            "extra": "gctime=91327179\nmemory=2089649168\nallocs=2769052\nparams={\"gctrial\":true,\"time_tolerance\":0.05,\"samples\":10000,\"evals\":1,\"gcsample\":false,\"seconds\":5,\"overhead\":0,\"memory_tolerance\":0.01}"
          }
        ]
      }
    ]
  }
}