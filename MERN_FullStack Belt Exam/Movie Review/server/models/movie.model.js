const mongoose = require("mongoose");

const Movie = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required."],
      minlength: [2, "Movie title must be at least 2 characters long."],
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        reviewer: {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          name: {
            type: String,
          },
        },
        rating: {
          type: Number,
        },
        review: {
          type: String,
          required: [true, "Review is required."],
          minlength: [3, "Review must be at least 3 characters long."],
        },
      },
    ],
  },
  { timestamps: true }
);

const MovieSchema = mongoose.model("MovieSchema", Movie);
module.exports = MovieSchema;