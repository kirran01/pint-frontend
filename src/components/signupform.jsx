import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const Signupform = ({closeModal}) => {
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
                console.log(createdUser.data)
                closeModal()
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='login-component'>
            <div className='pintrest-logo'>
                <img style={{ height: '32px' }} src="../../public/img/pint.png" alt="img" />
            </div>
            <h2>Welcome to Pintrest</h2>
            <h3>Find new ideas to try</h3>
            <form className='login-form' onSubmit={submitSignUp}>
                <div className='input-info-outer'>
                    <div className='input-info'>
                        <h4 htmlFor="email2">Email</h4>
                        <input placeholder='Email' value={signUpInput.signUpEmail} type="text" name="signUpEmail" onChange={handleSignUpInput} />
                        <h4>Username</h4>
                        <input value={signUpInput.signUpName} onChange={handleSignUpInput} name="signUpName" placeholder='Username' type="text" />
                        <h4 htmlFor="email2">Password</h4>
                        <input placeholder='Password' value={signUpInput.signUpPassword} type="password" name="signUpPassword" onChange={handleSignUpInput} />
                        <br />
                        <h5 style={{ margin: '0px 0px 15px' }}>Forgot your password?</h5>
                    </div>
                </div>
                <button id='login-button'>Sign Up</button>
                <h4 style={{ margin: '5px' }}>OR</h4>
                <button id='facebook-login-button'>
                    <div className='facebook-login-button-content'>
                        <span>
                            <img style={{ height: '20px' }} src="../../public/img/facebook.png" alt="" />
                        </span>
                        <h4>Continue with Facebook</h4>
                    </div>
                </button>
                <br />
                <button id='google-login-button'>
                    <div className='google-login-button-content'>

                        <span>
                            <img style={{ height: '20px' }} src="../../public/img/google.png" alt="" />
                        </span>

                        <h4>Continue with Google</h4>
                    </div>
                </button>
                <div className='terms'>
                    <h6>By continuing you agree to Kintrest's Terms Of Service and acknowledge you've read our Privacy Policy. Notice at collection.</h6>
                </div>
                <hr />
                <div className='end-terms'>
                    <h6>Not on pintrest yet? Sign up</h6>
                    <h6>Are you a business? Get started here!</h6>
                </div>
            </form>
        </div>
    );
}

export default Signupform;
