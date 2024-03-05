import React,{useContext} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Logout = () => {
    const Nav = useNavigate()
    const { setLoggedInUser } = useContext(UserContext)
    const logmeout = () => {
        axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
            .then(res => {
                window.localStorage.removeItem('userToken');
                window.localStorage.removeItem('userId');
                window.localStorage.removeItem('userName');
                setLoggedInUser(null);
                console.log(res)
                Nav('/')
            })
            .catch((err) => console.log(err))
    };


    return (
        <div className='my-3'>
            <button className='btn btn-secondary' onClick={() => logmeout()}>Logout</button>
        </div>
    );
}

export default Logout;
