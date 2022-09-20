const movieList = require("../models/movieList");

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
