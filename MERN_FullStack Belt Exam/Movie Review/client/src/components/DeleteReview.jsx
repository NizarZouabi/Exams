import React from 'react';
import axios from 'axios'

const DeleteReview = (props) => {
    const { movieId, reviewId, successCallback } = props

    const deleteReview = () => {
        axios.delete(`http://localhost:5000/api/movies/${movieId}/reviews/${reviewId}`, { withCredentials: true })
            .then(res => {
                successCallback()
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <button className='btn btn-danger btn-sm' onClick={deleteReview}>Remove</button>
        </div>
    );
}

export default DeleteReview;
