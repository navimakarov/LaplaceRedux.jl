window.BENCHMARK_DATA = {
  "lastUpdate": 1687470288339,
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
      },
      {
        "commit": {
          "author": {
            "email": "a.ionescu-5@student.tudelft.nl",
            "name": "Andrei Ionescu",
            "username": "Andrei32Ionescu"
          },
          "committer": {
            "email": "a.ionescu-5@student.tudelft.nl",
            "name": "Andrei Ionescu",
            "username": "Andrei32Ionescu"
          },
          "distinct": true,
          "id": "3f8725e3742ec3c803af8b6144772d885d10c387",
          "message": "Remove benchmarks from test forlder",
          "timestamp": "2023-06-22T19:15:39+02:00",
          "tree_id": "d1cb3704f351d3b4a755c91916bfb04de8323dc6",
          "url": "https://github.com/navimakarov/LaplaceRedux.jl/commit/3f8725e3742ec3c803af8b6144772d885d10c387"
        },
        "date": 1687457611343,
        "tool": "julia",
        "benches": [
          {
            "name": "fit_la_batched",
            "value": 661257911.5,
            "unit": "ns",
            "extra": "gctime=75858874.5\nmemory=1061381648\nallocs=1457837\nparams={\"gctrial\":true,\"time_tolerance\":0.05,\"samples\":10000,\"evals\":1,\"gcsample\":false,\"seconds\":5,\"overhead\":0,\"memory_tolerance\":0.01}"
          },
          {
            "name": "fit_la_unbatched",
            "value": 1305814895.5,
            "unit": "ns",
            "extra": "gctime=156516556.5\nmemory=2089649168\nallocs=2769052\nparams={\"gctrial\":true,\"time_tolerance\":0.05,\"samples\":10000,\"evals\":1,\"gcsample\":false,\"seconds\":5,\"overhead\":0,\"memory_tolerance\":0.01}"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "89662728+Andrei32Ionescu@users.noreply.github.com",
            "name": "Andrei32Ionescu",
            "username": "Andrei32Ionescu"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1d67d2ec2cf729b8cefb9ba81d466d27dad053c0",
          "message": "Merge pull request #39 from navimakarov/fix-benchmarks-main\n\nAttempt to fix benchmarking error",
          "timestamp": "2023-06-22T20:38:45+02:00",
          "tree_id": "d1cb3704f351d3b4a755c91916bfb04de8323dc6",
          "url": "https://github.com/navimakarov/LaplaceRedux.jl/commit/1d67d2ec2cf729b8cefb9ba81d466d27dad053c0"
        },
        "date": 1687460531752,
        "tool": "julia",
        "benches": [
          {
            "name": "fit_la_batched",
            "value": 361487725,
            "unit": "ns",
            "extra": "gctime=52204114.5\nmemory=1061381648\nallocs=1457837\nparams={\"gctrial\":true,\"time_tolerance\":0.05,\"samples\":10000,\"evals\":1,\"gcsample\":false,\"seconds\":5,\"overhead\":0,\"memory_tolerance\":0.01}"
          },
          {
            "name": "fit_la_unbatched",
            "value": 679678860.5,
            "unit": "ns",
            "extra": "gctime=98279371.5\nmemory=2089649168\nallocs=2769052\nparams={\"gctrial\":true,\"time_tolerance\":0.05,\"samples\":10000,\"evals\":1,\"gcsample\":false,\"seconds\":5,\"overhead\":0,\"memory_tolerance\":0.01}"
          }
        ]
      },
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
          "id": "5adcc8de7495031e8e783e9f7e33ddd9b41c8464",
          "message": "Mlj interfacing tweaks",
          "timestamp": "2023-05-31T20:38:56Z",
          "url": "https://github.com/navimakarov/LaplaceRedux.jl/pull/40/commits/5adcc8de7495031e8e783e9f7e33ddd9b41c8464"
        },
        "date": 1687469820720,
        "tool": "julia",
        "benches": [
          {
            "name": "fit_la_batched",
            "value": 374056720.5,
            "unit": "ns",
            "extra": "gctime=56554220\nmemory=1061381648\nallocs=1457837\nparams={\"gctrial\":true,\"time_tolerance\":0.05,\"samples\":10000,\"evals\":1,\"gcsample\":false,\"seconds\":5,\"overhead\":0,\"memory_tolerance\":0.01}"
          },
          {
            "name": "fit_la_unbatched",
            "value": 706937936,
            "unit": "ns",
            "extra": "gctime=101749954\nmemory=2089649168\nallocs=2769052\nparams={\"gctrial\":true,\"time_tolerance\":0.05,\"samples\":10000,\"evals\":1,\"gcsample\":false,\"seconds\":5,\"overhead\":0,\"memory_tolerance\":0.01}"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "94811276+MarkArdman@users.noreply.github.com",
            "name": "MarkArdman",
            "username": "MarkArdman"
          },
          "committer": {
            "email": "94811276+MarkArdman@users.noreply.github.com",
            "name": "MarkArdman",
            "username": "MarkArdman"
          },
          "distinct": true,
          "id": "5adcc8de7495031e8e783e9f7e33ddd9b41c8464",
          "message": "Merge branch 'main' into mlj-interfacing-tweaks",
          "timestamp": "2023-06-22T23:13:55+02:00",
          "tree_id": "8225045320ead2f88eb5a16b9413c9583603126a",
          "url": "https://github.com/navimakarov/LaplaceRedux.jl/commit/5adcc8de7495031e8e783e9f7e33ddd9b41c8464"
        },
        "date": 1687470284421,
        "tool": "julia",
        "benches": [
          {
            "name": "fit_la_batched",
            "value": 581866319,
            "unit": "ns",
            "extra": "gctime=70021236\nmemory=1061381648\nallocs=1457837\nparams={\"gctrial\":true,\"time_tolerance\":0.05,\"samples\":10000,\"evals\":1,\"gcsample\":false,\"seconds\":5,\"overhead\":0,\"memory_tolerance\":0.01}"
          },
          {
            "name": "fit_la_unbatched",
            "value": 1098224980,
            "unit": "ns",
            "extra": "gctime=138156265\nmemory=2089649168\nallocs=2769052\nparams={\"gctrial\":true,\"time_tolerance\":0.05,\"samples\":10000,\"evals\":1,\"gcsample\":false,\"seconds\":5,\"overhead\":0,\"memory_tolerance\":0.01}"
          }
        ]
      }
    ]
  }
}