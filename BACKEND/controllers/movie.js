const movieList = require("../models/movieList");
const genreList = require("../models/genreList");
const videoList = require("../models/videoList");

exports.getMovieList = (req, res) => {
  movieList.fetchAll((movieList) => {
    res.send(movieList);
  });
};

exports.getMovieTrending = (req, res, next) => {
  const page = req.params.page;
  movieList.fetchAll((movieList) => {
    const movieListTrending = movieList;
    movieListTrending.sort((a, b) => b.popularity - a.popularity);
    res.status(200).send({
      results: movieListTrending.slice(page * 20 - 20, page * 20),
      page: page,
      total_pages: movieList.length / 20,
    });
  });
};

exports.getMovieTopRate = (req, res, next) => {
  const page = req.params.page;
  movieList.fetchAll((movieList) => {
    const movieListTopRate = movieList;
    movieListTopRate.sort((a, b) => b.vote_average - a.vote_average);
    res.status(200).send({
      results: movieListTopRate.slice(page * 20 - 20, page * 20),
      page: page,
      total_pages: movieList.length / 20,
    });
  });
};

exports.getMovieGenre = (req, res, next) => {
  if (req.params.genreId === undefined) {
    res.status(400).send("Not found genre param");
  } else {
    const movieGenre = [];
    const page = req.params.page;
    const genreId = +req.params.genreId;
    movieList.fetchAll((movieList) => {
      movieList.forEach((movie) => {
        if (movie.genre_ids != undefined) {
          const a = movie.genre_ids.filter((id) => id === genreId);
          if (a.length > 0) {
            movieGenre.push(movie);
          }
        }
      });
      genreList.fetchAll((genreList) => {
        const checkGenreId = genreList.filter((item) => item.id === genreId);
        if (checkGenreId.length === 0) {
          res.status(404).send("Not found that genre id");
        } else {
          const genre_name = genreList.filter(
            (item) => item.id === genreId
          ).name;
          res.status(200).send({
            results: movieGenre.slice(page * 20 - 20, page * 20),
            page: page,
            total_pages: Math.ceil(movieGenre.length / 20),
            genre_name: genre_name,
          });
        }
      });
    });
  }
};

exports.getMovieTrailer = (req, res, next) => {
  const movieId = +req.params.movieId;
  if (req.params.movieId === undefined) {
    res.status(400).send("Not found film_id param");
  } else {
    let videos = [];
    let videoTrailer = [];
    videoList.fetchAll((videoList) => {
      const videoOfMovie = videoList.filter((movie) => movie.id === movieId)[0];
      if (!videoOfMovie) {
        res.status(404).send("Not found video");
      } else {
        videos = videoOfMovie.videos.filter(
          (video) =>
            video.official === true &&
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser")
        );

        let a = videos.filter((video) => video.type === "Trailer");
        if (a.length > 0) {
          videoTrailer = a;
        } else videoTrailer = videos;

        videoTrailer.sort((a, b) => {
          var c = new Date(a.published_at);
          var d = new Date(b.published_at);
          return d - c;
        });

        if (videoTrailer.length > 0) {
          res.status(200).send(videoTrailer[0]);
        }
      }
    });
  }
};
