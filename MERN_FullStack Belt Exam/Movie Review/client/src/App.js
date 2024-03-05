import './App.css';
import { useState } from 'react';
import { Route, Routes} from "react-router-dom"
import LoginReg from './views/LoginReg';
import MovieList from './views/MovieList';
import AddMovie from './views/AddMovie';
import AddReview from './views/AddReview'
import ShowReviews from './views/ShowReviews';


function App() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");

  return (
    <div className="bg-light" style={{ padding: 50, height: 960 }}>
      <h1 className="fw-bold mb-5 text-danger">Moldy Tomatoes</h1>
      <Routes>
        <Route path="/" element={<LoginReg />} default />
        <Route
          path="/api/movies"
          element={<MovieList movies={movies} setMovies={setMovies} />}
        />
        <Route path="/api/movies/:id" element={<ShowReviews />} />
        <Route
          path="/api/movies/new"
          element={
            <AddMovie
              movies={movies}
              setMovies={setMovies}
              title={title}
              setTitle={setTitle}
              avgRating={avgRating}
              setAvgRating={setAvgRating}
              reviewer={reviewer}
              setReviewer={setReviewer}
              rating={rating}
              setRating={setRating}
              review={review}
              setReview={setReview}
            />
          }
        />
        <Route
          path="/api/movies/review/:id"
          element={
            <AddReview
              movies={movies}
              setMovies={setMovies}
              title={title}
              avgRating={avgRating}
              setAvgRating={setAvgRating}
              reviewer={reviewer}
              setReviewer={setReviewer}
              rating={rating}
              setRating={setRating}
              review={review}
              setReview={setReview}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
