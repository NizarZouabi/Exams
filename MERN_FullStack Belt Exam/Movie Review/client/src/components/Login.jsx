import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setLoggedInUser } = useContext(UserContext)
    const [loginErrors, setLoginErrors] = useState({})
    const Nav = useNavigate()


    const loginHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/login', {
            email,
            password
        }, { withCredentials: true })
            .then(res => {
                window.localStorage.setItem('userToken', res.data)
                window.localStorage.setItem('userId', res.data.user.userId)
                window.localStorage.setItem('userName', res.data.user.firstName)
                console.log(res.data)
                setEmail('')
                setPassword('')
                setLoggedInUser(res.data.user);
                Nav('/api/movies')
            })
            .catch((err) => {
                console.log(err)
                setLoginErrors(err.response.data)
        })
    }


    return (
        <div className='w-25'>
            <form className='form-control d-flex d-flex gap-2 p-3 flex-column shadow' onSubmit={loginHandler}>
                <div className='mb-2'>
                <p className='display-6 text-center fw-bold text-secondary mt-3'>Login</p>
                <label>Email:</label>
                <input className='form-control' name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                {loginErrors.error ? <p className='text-danger'>{loginErrors.error.email}</p> : null}
                </div>
                <div className='mb-2'>
                <label>Password:</label>
                <input className='form-control' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {loginErrors.error ? <p className='text-danger'>{loginErrors.error.password}</p> : null}
                </div>
                <button className='m-5 btn btn-success'>Confirm</button>
            </form>
        </div>
    );
}

export default Login;
