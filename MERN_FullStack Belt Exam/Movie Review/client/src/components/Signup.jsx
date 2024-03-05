import React, { useState } from 'react';
import axios from 'axios'

const Signup = () => {
    const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    })
    const [passwordMatchError, setPasswordMatchError] = useState('')
    const [registerErrors, setRegisterErrors] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        if (userForm.password !== userForm.confirmPassword) {
            return setPasswordMatchError('Passwords do not match.')
        }
        setPasswordMatchError('')

        axios.post('http://localhost:5000/api/register', {
            firstName: userForm.firstName,
            lastName: userForm.lastName,
            email: userForm.email,
            password: userForm.password,
            confirmPassword: userForm.confirmPassword
        }, { withCredentials: true })
            .then(res => {
                setUserForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                setRegisterErrors({})
            })
            .catch((err) => {
                console.log(err)
                setRegisterErrors(err.response.data.errors)
            })
    };


    return (
        <div className='w-25'>
            <form className='form-control d-flex gap-2 p-3 flex-column shadow' onSubmit={submitHandler}>
                <p className='display-6 text-center fw-bold text-secondary mt-3'>Register</p>
                <label>First Name:</label>
                <input className='form-control' type='text' name='firstName' value={userForm.firstName} onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })} />
                {registerErrors.firstName ? <p className='text-danger'>{registerErrors.firstName.message}</p> : null}
                <label>Last Name:</label>
                <input className='form-control' type='text' name='lastName' value={userForm.lastName} onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })} />
                {registerErrors.lastName ? <p className='text-danger'>{registerErrors.lastName.message}</p> : null}
                <label>Email:</label>
                <input className='form-control' type='email' name='email' value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
                {registerErrors.email ? <p className='text-danger'>{registerErrors.email.message}</p> : null}
                <label>Password:</label>
                <input className='form-control' type='password' name='password' value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} />
                {registerErrors.password ? <p className='text-danger'>{registerErrors.password.message}</p> : null}
                <label>Confirm Password:</label>
                <input className='form-control' type='password' name='confirmPassword' value={userForm.confirmPassword} onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })} />
                {passwordMatchError && (<p className='text-danger'>{passwordMatchError}</p>)}
                <button className='m-5 btn btn-primary'>Submit</button>
            </form>
        </div>
    );
}

export default Signup;
