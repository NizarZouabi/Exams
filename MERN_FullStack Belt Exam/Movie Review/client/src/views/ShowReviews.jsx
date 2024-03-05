import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Logout from '../components/Logout';
import DeleteMovie from '../components/DeleteMovie';
import DeleteReview from '../components/DeleteReview';
import { UserContext } from '../context/userContext';
import axios from 'axios'

const ShowReviews = () => {
    const {id} = useParams()
    const [reviews, setReviews] = useState([])
    const [movie, setMovie] = useState({})
    const authToken = localStorage.getItem('userToken')
    const { loggedInUser } = useContext(UserContext)
    const Nav = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setMovie(res.data.Movie)
                setReviews((res.data.Movie.reviews))
            })
            .catch(err => {
            console.log(err)
        })
    }, [id, authToken, setReviews])


    const removeFromDom = (reviewId) => {
        setReviews(reviews.filter(review => review._id !== reviewId))
    }
    
        if (!authToken) {
        return (<p className="fw-bold text-danger">Please login to view this page</p>)
    }

    return (
        <div className='container border'>
            {movie && movie._id ? (
                <div>
            <div className="d-flex justify-content-between">
                <h3 className="fw-bold ms-2 mt-4">Reviews for {movie && movie.title}</h3>
                <Logout />
            </div>
            <table className='border table table-striped shadow text-center'>
                <thead>
                    <tr>
                        <th>Reviewer</th>
                        <th>Rating</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.length > 0 ? (reviews.map((review, id) => (
                    <tr key={id}>
                        <td className='d-flex justify-content-center gap-2'>{review.reviewer.name}{loggedInUser._id === review.reviewer._id && <DeleteReview movieId={movie._id} reviewId={review._id} successCallback={() => removeFromDom(review._id)}/>}</td>
                        <td>{review.rating}</td>
                        <td>{review.review}</td>
                    </tr>
                    ))
                    ) : (<tr><td colSpan={3}> No Reviews. </td></tr>)
                    }
                </tbody>
            </table>
            <DeleteMovie movieId={movie && movie._id} successCallback={() => (Nav('/api/movies'))} /> </div>) : (<div><p className='display-6 lead text-danger'>Movie Not Found.</p></div>)}
        </div>
    );
}

export default ShowReviews;
