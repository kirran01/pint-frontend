import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

const Loginform = () => {
    const { storeToken, authenticateUser } = useContext(AuthContext)
    const [loginInput, setLoginInput] = useState({
        loginUserName: '',
        loginPassword: ''
    })
    const handleLoginInput = (e) => {
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value })
    }

    const submitLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/login', {
            username: loginInput.loginUserName,
            password: loginInput.loginPassword
        })
            .then(loginRes => {
                console.log(loginRes.data)
                storeToken(loginRes.data.authToken)
                authenticateUser()
                // if (!loginRes.data.authToken) {
                //     console.log('no token')
                // } else {
                //     console.log('success')
                // }
            })
            .catch(err => {
                console.log(err, "<--err")
            })
    }

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={submitLogin}>
                <label htmlFor="email2">Username</label>
                <br />
                <input value={loginInput.loginUserName} type="text" name="loginUserName" onChange={handleLoginInput} />
                <br />
                <label htmlFor="email2">Password</label>
                <br />
                <input value={loginInput.loginPassword} type="text" name="loginPassword" onChange={handleLoginInput} />
                <br />
                <button>Log In</button>
            </form>
        </div>
    );
}

export default Loginform;
