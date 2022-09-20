const movieList = require("../models/movieList");

exports.getMovieList = (req, res) => {
  movieList.fetchAll((movieList) => {
    res.send(movieList);
  });
};
