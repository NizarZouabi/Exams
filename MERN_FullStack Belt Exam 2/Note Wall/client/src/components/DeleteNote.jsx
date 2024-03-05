import React from 'react';
import axios from 'axios';

const DeleteNote = (props) => {
    const { noteId, successCallback } = props
    
    const deleteNote = () => {
        axios.delete(`http://localhost:5000/notes/${noteId}`)
            .then(() => {
                successCallback()
            })
            .catch((err) => console.log(err))
    }


    return (
        <div>
            <button className='btn btn-danger my-5' onClick={deleteNote}>Delete Note</button>
        </div>
    );
}

export default DeleteNote;
