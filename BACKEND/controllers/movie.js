const movieList = require("../models/movieList");
const genreList = require("../models/genreList");

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
  const movieGenre = [];
  const page = req.params.page;
  const genreId = +req.params.genreId;
  movieList.fetchAll((movieList) => {
    movieList.forEach((movie) => {
      if (movie.genre_ids != undefined) {
        const a = movie.genre_ids.filter((id) => id === genreId);
        if (a.length > 0) movieGenre.push(movie);
      }
    });
    genreList.fetchAll((genreList) => {
      const genre_name = genreList.find((item) => item.id === genreId).name;
      res.status(200).send({
        results: movieGenre.slice(page * 20 - 20, page * 20),
        page: page,
        total_pages: Math.ceil(movieGenre.length / 20),
        genre_name: genre_name,
      });
    });
  });
};
