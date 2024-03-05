const MovieSchema = require("../models/movie.model");
const Movie = require("../models/movie.model");

module.exports.findAllMovies = (req, res) => {
  MovieSchema.find()
    .then((AllMovies) => {
      console.log(AllMovies);
      res.json({ AllMovies });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.createNewMovie = (req, res) => {
  delete req.body._id;
  Movie.create(req.body)
    .then((CreateMovie) => {
      console.log(CreateMovie);
      res.json({ CreateMovie });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.getOneMovie = (req, res) => {
  Movie.findOne({ _id: req.params.id })
    .then((Movie) => {
      if (!Movie) {
        return res.redirect("/api/movies");
      }
      console.log(Movie);
      res.json({ Movie });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.AddReview = async (req, res) => {
  const { reviewer, rating, review } = req.body;
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          reviews: { reviewer, rating, review },
        },
      },
      { new: true, runValidators: true }
    );
    const validReviews = updatedMovie.reviews.filter(
      (review) => typeof review.rating === "number"
    );
    const totalRating = validReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    updatedMovie.avgRating =
      validReviews.length > 0
        ? (totalRating / validReviews.length).toFixed(2)
        : 0;

    await updatedMovie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.deleteReview = async (req, res) => {
  const { reviewId, id } = req.params;
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          reviews: { _id: reviewId },
        },
      },
      { new: true, runValidators: true }
    );
    const validReviews = updatedMovie.reviews.filter(
      (review) => typeof review.rating === "number"
    );
    const totalRating = validReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    updatedMovie.avgRating =
      validReviews.length > 0
        ? (totalRating / validReviews.length).toFixed(2)
        : 0;
    await updatedMovie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.removeMovie = (req, res) => {
  Movie.deleteOne({ _id: req.params.id })
    .then((DeletedMovie) => {
      res.json({ DeletedMovie });
    })
    .catch((err) => res.status(400).json(err));
};
