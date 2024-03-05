const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
require("./config/mongoose.config");

const port = process.env.PORT;
const MoviesRoutes = require("./routes/movie.routes")
const UsersRoutes = require("./routes/user.routes")
MoviesRoutes(app)
UsersRoutes(app)

app.listen(port, () => {
  console.log(`>>> Server running on Port: ${port}`);
});