const express = require("express");

const Movie = require("../models/movie.model");

const authenticate = require("../middlewares/authenticate");

const authorise = require("../middlewares/authorise");

const router = express.Router();

router.post(
  "/",
  authenticate,
  async (req, res) => {
  try {

    const movie = await Movie.create({
        name: req.body.name,
        actors: req.body.actors,
        languages: req.body.languages,
        directors: req.body.directors,
        poster_url: req.body.poster_url,
        // user: user.user._id,
    });

    return res.status(201).json({ movie });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
}
);

router.get("/", async (req, res) => {
  const movies = await Movie.find().lean().exec();

  return res.send(movies);
});

module.exports = router;
