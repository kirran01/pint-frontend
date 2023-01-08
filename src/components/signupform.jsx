import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const Signupform = () => {
    const [signUpInput, setSignUpInput] = useState({
        signUpEmail: '',
        signUpPassword: '',
        signUpName: ''
    })
    const handleSignUpInput = (e) => {
        setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value })
    }

    const submitSignUp = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/signup', {
            email: signUpInput.signUpEmail,
            password: signUpInput.signUpPassword,
            username: signUpInput.signUpName
        })
            .then(createdUser => {
                console.log(createdUser)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <h2>Sign up</h2>
            <form onSubmit={submitSignUp}>
                <label htmlFor="email">Email</label>
                <br />
                <input value={signUpInput.signUpEmail} type="text" name="signUpEmail" onChange={handleSignUpInput} />
                <br />
                <label htmlFor="email">Password</label>
                <br />
                <input value={signUpInput.signUpPassword} type="text" name="signUpPassword" onChange={handleSignUpInput} />
                <br />
                <label htmlFor="email">username</label>
                <br />
                <input value={signUpInput.signUpName} type="text" name="signUpName" onChange={handleSignUpInput} />
                <br />
                <button>Continue</button>
            </form>
        </div>
    );
}

export default Signupform;
