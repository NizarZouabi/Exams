import React from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';

const LoginReg = () => {
    const Nav = useNavigate()
    const authToken = localStorage.getItem('userToken')

    if (authToken) {
        Nav("/api/movies")
        return
    }


    return (
        <div className='d-flex justify-content-center gap-5'>
            <Signup />
            <Login />
        </div>
    );
}

export default LoginReg;