import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NoteWall = (props) => {
    const { notes, setNotes } = props

    useEffect(() => {
        axios.get("http://localhost:5000/notes")
        .then((res) => {
            console.log(res.data.AllNotes)
            setNotes(res.data.AllNotes)
        })
        .catch((err) => console.log(err))
    }, [setNotes])


    return (
        <div className='container'>
            <div className='d-flex justify-content-between'>
                <h1 className='display-3'>Note Wall</h1><Link to="/notes/new"><button className='btn btn-primary'>Write note</button></Link>
            </div>
            <p>Leave a note</p>
            <div className='border-top border-2'>
                {notes.length > 0 ? notes.map((note, id) => (
                    <div className='m-3 p-3 bg-warning border shadow' key={id}>
                        <div className='d-flex justify-content-between'>
                            <h3>{note.title}</h3><Link to={`/notes/edit/${note._id}`} ><button className='btn btn-success me-5'>Edit</button></Link>
                        </div>
                        <p className='lead'>{note.body}</p>
                    </div>
                )) : (<p className='m-2'>No notes available to display.</p>)
                }
            </div>
        </div>
    );
}

export default NoteWall;
