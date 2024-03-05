import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoBack from '../components/GoBack';

const WriteNote = (props) => {
    const { notes, setNotes } = props
    const [error, setErrors] = useState([])
    const Nav = useNavigate()
    const [note, setNote] = useState({
        title: "",
        body: ""
    })

    const submitHandler = (e) => {
        e.preventDefault();

        const newNote = {
            title: note.title,
            body: note.body
        }

        axios.post("http://localhost:5000/notes/new", newNote)
            .then((res) => {
                console.log(res.data)
                setNotes([...notes, res.data])
                Nav("/")
            })
            .catch(err => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className='container'>
            <div className='d-flex justify-content-between'>
                <h1 className='display-3'>Write Notes</h1><GoBack/>
            </div>
            <p>Write a new note!</p>
            <form className='d-flex flex-column p-3 shadow form-control' onSubmit={submitHandler}>
                <label className='form-group mt-3'>Note Title:</label>
                <input className='form-control mt-1 bg-warning' type="text" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} name='title' />
                {error.title && <p className='text-danger'>{error.title.message}</p>}
                <label className='form-group mt-3'>Note Body:</label>
                <textarea rows={8} cols={8} className='form-control mt-1 bg-warning' value={note.body} onChange={(e) => setNote({ ...note, body: e.target.value })} name='body'></textarea>
                {error.body && <p className='text-danger'>{error.body.message}</p>}
                <button className='btn btn-success my-5 w-25' type='submit'>Write this Note!</button>
            </form>
        </div>
    );
}

export default WriteNote;
