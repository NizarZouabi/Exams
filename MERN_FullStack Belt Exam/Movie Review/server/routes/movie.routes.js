const MovieController = require("../controllers/movie.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
    app.get("/api/movies", authenticate, MovieController.findAllMovies);
    app.post("/api/movies/new", authenticate, MovieController.createNewMovie);
    app.get("/api/movies/:id", authenticate, MovieController.getOneMovie);
    app.delete("/api/movies/:id", authenticate, MovieController.removeMovie);
    app.delete("/api/movies/:id/reviews/:reviewId", authenticate, MovieController.deleteReview)
    app.patch("/api/movies/review/:id", authenticate, MovieController.AddReview);
};
