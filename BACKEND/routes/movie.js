const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movie");

router.get("/movies/trending/", movieController.getMoviesTrending);
router.get("/movies/trending/:page", movieController.getMoviesTrending);

router.get("/movies/top-rate", movieController.getMoviesTopRate);
router.get("/movies/top-rate/:page", movieController.getMoviesTopRate);

router.get(
  "/movies/discover/:genreId/:page",
  movieController.getMoviesDiscover
);
router.get("/movies/discover/:genreId", movieController.getMoviesDiscover);
router.get("/movies/discover/", movieController.getMoviesDiscover);

router.get("/movies/list-genre", movieController.getListGenre);

router.get("/movies/video/:movieId", movieController.getMovieTrailer);
router.get("/movies/video", movieController.getMovieTrailer);

router.get("/movies/search/:keyword", movieController.getMovieSearch);
router.get("/movies/search/", movieController.getMovieSearch);

router.get("/movies/movieId/:id", movieController.getMovieId);

module.exports = router;
