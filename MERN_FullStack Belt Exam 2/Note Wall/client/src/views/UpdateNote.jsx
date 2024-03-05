import React,{ useState, useEffect } from 'react';
import DeleteNote from '../components/DeleteNote';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import GoBack from '../components/GoBack';

const UpdateNote = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [noteId, setNoteId] = useState({})
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true);
    const Nav = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/notes/${id}`)
            .then((res) => {
                console.log(res.data)
                setTitle(res.data.Note.title)
                setBody(res.data.Note.body)
                setNoteId(res.data.Note._id)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
            })
    }, [id])

    const editNote = (e) => {
        e.preventDefault()

        const updatedNote = {
            title: title,
            body: body
        }

        axios.patch(`http://localhost:5000/notes/edit/${id}`, updatedNote)
            .then((res) => {
                console.log(res.data)
                Nav("/")
            })
            .catch(err => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }
    
    if (loading) {
        return <p className='m-5 display-3'>Loading...</p>;
    }

    return noteId !== id ? (<div><p className='m-5 display-3 lead text-danger'>This note was removed or doesn't exist.</p></div>) : (
        <div className='container'>
            <div className='d-flex justify-content-between'>
                <h1 className='display-3'>Note</h1><GoBack/>
            </div>
            <form className='d-flex flex-column p-3 shadow form-control' onSubmit={editNote}>
                <label className='form-group mt-3'>Note Title:</label>
                <input className='form-control mt-1 bg-warning' type="text" value={title} onChange={(e) => setTitle(e.target.value)} name='title' />
                {errors.title && <p className='text-danger'>{errors.title.message}</p>}
                <label className='form-group mt-3'>Note Body:</label>
                <textarea rows={8} cols={8} className='form-control mt-1 bg-warning' value={body} onChange={(e) => setBody(e.target.value)} name='body'></textarea>
                {errors.body && <p className='text-danger'>{errors.body.message}</p>}
                <div className='d-flex gap-3'>
                <button className='btn btn-success my-5' type='submit'>Edit Note</button><DeleteNote noteId={id} successCallback={() => Nav("/")}/>
                </div>
            </form>
        </div>
    );
}

export default UpdateNote;
