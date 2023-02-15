import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import PintLogo from '../../public/img/pint.png'
import FbLogo from '../../public/img/facebook.png'
import GoogLogo from  '../../public/img/google.png'


const Signupform = ({ closeModal }) => {
    const [errMessage, setErrMessage] = useState('')
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
        axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
            email: signUpInput.signUpEmail,
            password: signUpInput.signUpPassword,
            username: signUpInput.signUpName
        })
            .then(createdUser => {
                console.log(createdUser.data)
                closeModal()
            })
            .catch(err => {
                console.log(err, "errsignup")
                setErrMessage(err.response.data.message)

            })
    }
    return (
        <div className='login-component'>
            <div className='pintrest-logo'>
                <img style={{ height: '32px' }} src={PintLogo} alt="img" />
            </div>
            <h2>Welcome to Pintrest</h2>
            {errMessage&&<h4>{errMessage}</h4>}
            {<h3>Find new ideas to try</h3>}
            <form  style={{margin:'10px 100px 10px'}} className='login-form' onSubmit={submitSignUp}>
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
                            <img style={{ height: '20px' }} src={FbLogo} alt="" />
                        </span>
                        <h4>Continue with Facebook</h4>
                    </div>
                </button>
                <br />
                <button id='google-login-button'>
                    <div className='google-login-button-content'>

                        <span>
                            <img style={{ height: '20px' }} src={GoogLogo} alt="" />
                        </span>

                        <h4>Continue with Google</h4>
                    </div>
                </button>
            </form>
        </div>
    );
}

export default Signupform;
