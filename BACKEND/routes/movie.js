const express = require("express");

const router = express.Router();

const movieListController = require("../controllers/movie");

// /admin/products => GET
router.get("/movies", movieListController.getMovieList);

module.exports = router;
