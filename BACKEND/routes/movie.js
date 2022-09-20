const express = require("express");

const router = express.Router();

const movieListController = require("../controllers/movie");

// /admin/products => GET
router.get("/movies", movieListController.getMovieList);

router.get("/movies/trending/:page", movieListController.getMovieTrending);

module.exports = router;
