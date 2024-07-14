import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("Admin");

    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/signup", {email,password,role})
        .then(res => navigate('/'))
        .catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
        <div className='p-3 bg-white w-25'>
            <form onSubmit={handleSignUp}>
                <div className='mb-3'>
                    <label>Email</label>
                    <input onChange={e => setEmail(e.target.value)} type='email' placeholder='Enter Email' className='form-control'/>
                </div>
                <div className='mb-3'>
                    <label>Password</label>
                    <input onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter Password' className='form-control'/>
                </div>
                <div className='mb-3'>
                    <label>Role</label>
                    <select onChange={e => setRole(e.target.value)} className='form-select mt-1'>
                        <option>Admin</option>
                        <option>Visitor</option>
                    </select>
                </div>
                <button className='btn btn-success w-100 rounded-0'>Sign Up</button>               
            </form>
        </div>
    </div>
  )
}

export default SignUp