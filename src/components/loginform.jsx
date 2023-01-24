import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

const Loginform = ({closeModal2}) => {
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
                closeModal2()
            })
            .catch(err => {
                console.log(err, "<--err")
            })
    }
    return (
        <div className='login-component'>
            <div className='pintrest-logo'>
                <img style={{ height: '32px' }} src="../../public/img/pint.png" alt="img" />
            </div>
            <h2>Welcome to Pintrest</h2>
            <form className='login-form' onSubmit={submitLogin}>
                <div className='input-info-outer'>
                <div className='input-info'>
                <h4 htmlFor="email2">Username</h4>
                <input placeholder='Username' value={loginInput.loginUserName} type="text" name="loginUserName" onChange={handleLoginInput} />
                <h4 htmlFor="email2">Password</h4>
                <input placeholder='Password' value={loginInput.loginPassword} type="password" name="loginPassword" onChange={handleLoginInput} />
                <br />
                <h5 style={{margin:'0px 0px 15px'}}>Forgot your password?</h5>
                </div>
                </div>
                <button id='login-button'>Continue</button>
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
                <div>
                <hr />
                </div>
                <div className='end-terms'>
                    <h6>Not on pintrest yet? Sign up</h6>
                    <h6>Are you a business? Get started here!</h6>
                </div>
            </form>
        </div>
    );
}

export default Loginform;




