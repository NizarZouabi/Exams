import React from 'react';
import axios from 'axios'

const DeleteMovie = (props) => {
    const authToken = localStorage.getItem('userToken')
    const { movieId, successCallback } = props

    const removeMovie = (e) => {
        axios.delete(`http://localhost:5000/api/movies/${movieId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true})
            .then(res => {
                console.log(res)
                successCallback()
            })
        .catch((err) => console.log(err))
    }


    return (
        <div>
            <button className='btn btn-danger m-3' onClick={removeMovie}>Delete Movie</button>
        </div>
    );
}

export default DeleteMovie;