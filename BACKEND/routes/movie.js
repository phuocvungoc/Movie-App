const express = require("express");

const router = express.Router();

const movieListController = require("../controllers/movie");

// /admin/products => GET
router.get("/movies", movieListController.getMovieList);

router.get("/movies/trending/:page", movieListController.getMovieTrending);

router.get("/movies/top-rate/:page", movieListController.getMovieTopRate);

router.get(
  "/movies/discover/:genreId/:page",
  movieListController.getMovieGenre
);

router.get("/movies/video/:movieId", movieListController.getMovieTrailer);
router.get("/movies/video/", movieListController.getMovieTrailer);

module.exports = router;
