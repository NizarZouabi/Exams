import React, { useContext,useEffect } from "react";
import { Link } from 'react-router-dom'
import Logout from "../components/Logout";
import axios from 'axios'
import { UserContext } from '../context/userContext';

const MovieList = (props) => {
    const { movies, setMovies } = props
    const { loggedInUser } = useContext(UserContext)
    const authToken = window.localStorage.getItem('userToken')


    useEffect(() => {
        axios.get("http://localhost:5000/api/movies", {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true,
        })
            .then(res => {
            setMovies(res.data.AllMovies)
            })
            .catch(err => {
                console.log(err)
        })
    }, [authToken, setMovies])

    if (!authToken) {
        return (<p className="fw-bold text-danger">Please login to view this page</p>)
    }
    
    return (
        <div>
            <h1 className='my-5'>Welcome, {loggedInUser.firstName} {loggedInUser.lastName} </h1>
            <div className='container border'>
            <div className="d-flex justify-content-between">
                <h3 className="fw-bold ms-2 mt-4">Movie List</h3>
                <div className="d-flex gap-3">
                    <Link to={'/api/movies/new'}><button className="btn btn-primary my-3">Add a new Movie</button></Link>
                    <Logout />
                </div>
            </div>
            <table className='border table table-striped shadow text-center'>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Avg. Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.length > 0 ? movies.map((movie, id) => (
                    <tr key={id}>
                        <td>{movie.title}</td>
                        <td>{movie.avgRating}</td>
                        <td>
                            <div className='d-flex flex-row gap-2 justify-content-center'>
                                <Link to={`/api/movies/${movie._id}`} ><button className='btn btn-success text-dark'>Read Reviews</button></Link>
                                <Link to={`/api/movies/review/${movie._id}`} ><button className='btn btn-success'>Write a Review</button></Link>
                            </div>
                        </td>
                    </tr>
                    )) : (<tr><td colSpan={3}> No Movies. </td></tr>)
                    }
                </tbody>
                </table>
                </div>
        </div>
    );
}

export default MovieList;


