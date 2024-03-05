import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Logout from '../components/Logout';
import axios from "axios"


const AddReview = (props) => {
    const authToken = localStorage.getItem('userToken')
    const Nav = useNavigate()
    const [movie, setMovie] = useState({})
    const { reviewer, setReviewer } = props;
    const { setAvgRating } = props;
    const {rating, setRating} = props;
    const { review, setReview } = props;
    const { id } = useParams()
    const { loggedInUser } = useContext(UserContext)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setMovie(res.data.Movie)
            })
            .catch(err => {
            console.log(err)
        })
    }, [id,authToken])

    const submitHandler = (e) => {
        e.preventDefault()

        const addReview = {
            reviewer: {
                _id: loggedInUser._id,
                name: loggedInUser.firstName,
            },
            rating,
            review,
        };

        axios.patch(`http://localhost:5000/api/movies/review/${id}`, addReview, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true
        })
            .then(res => {
                console.log(res.data)
                setReviewer("")
                setRating(1)
                setReview("")
                setAvgRating(res.data.avgRating)
                Nav(`/api/movies/${id}`)
            })
            .catch((err) => {
                console.log(err.response.data)
                setErrors(err.response.data.errors)
            })
    }

        if (!authToken) {
        return (<p className="fw-bold text-danger">Please login to view this page</p>)
    }

    return (
        <div className='container p-3 border'>
            <div className="d-flex justify-content-between">
                <h3 className='fw-bold ms-2 mt-4'>Add a review for {movie.title}</h3>
                <Logout/>
            </div>
            <form className='container shadow border w-50 p-5 d-flex flex-column gap-3' onSubmit={submitHandler}>
                <label>Your Name: <input className='form-control' name='reviewer' value={loggedInUser.firstName} onChange={(e) => setReviewer(e.target.value)} /></label>
                {reviewer.length <= 1 && reviewer.length !== 0 ? <p className='text-danger'>Name must be more than 1 character</p> : ''}
                
                <select className="form-control w-50" id="rating" name="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5</option>
                    <option value="4">4</option>
                    <option value="4.5">4.5</option>
                    <option value="5">5</option>
                </select>

                <label className='d-flex flex-column'>Your Review:<textarea className='form-control' name='review' value={review} onChange={(e) => setReview(e.target.value)}></textarea></label>
                {review.length <= 2 && review.length !== 0 ? <p className='text-danger'>Review must be more than 2 characters</p> : ''}
                
                {errors && Object.keys(errors).map((key) => (<p key={key} className='text-danger'>{errors[key].message}</p>))}
                <div className='d-flex gap-3'>
                    <button type='submit' className='btn btn-success'>Submit</button><Link to={'/api/movies'}><button className='btn btn-secondary'>Cancel</button></Link>
                </div>
            </form>
        </div>
    );
}

export default AddReview;
