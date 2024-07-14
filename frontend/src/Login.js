import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/login', {email,password})
        .then(res => {
            if (res.data.validLogin) {
                // Store JWT in local storage
                localStorage.setItem("token", res.data.token);
                if (res.data.role === "Admin") {
                    navigate('/admin');
                }
                if (res.data.role === "Visitor") {
                    navigate('visitor');
                }
            } else {
                console.log("Invalid Login");
            }
        })
        .catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
        <div className='p-3 bg-white w-25'>
            <form onSubmit={handleLogin}>
                <div className='mb-3'>
                    <label>Email</label>
                    <input onChange={e => setEmail(e.target.value)} type='email' placeholder='Enter Email' className='form-control'/>
                </div>
                <div className='mb-3'>
                    <label>Password</label>
                    <input onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter Password' className='form-control'/>
                </div>
                <button className='btn btn-success w-100 rounded-0'>Login</button> 
                <Link to={'/signup'} className='btn btn-default border w-100 bg-light rounded-0 mt-3'>Sign Up</Link>               
            </form>
        </div>
    </div>
  )
}

export default Login