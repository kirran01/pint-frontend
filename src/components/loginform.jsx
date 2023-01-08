import React from 'react';
import { useState } from 'react';

const Loginform = () => {
    const [loginInput, setLoginInput] = useState({
        loginEmail: '',
        loginPassword: ''
    })
    const handleLoginInput = (e) => {
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h2>Log In</h2>
            <form>
                <label htmlFor="email2">Email</label>
                <br />
                <input value={loginInput.loginEmail} type="text" name="loginEmail" onChange={handleLoginInput} />
                <br />
                <label htmlFor="email2">Password</label>
                <br />
                <input value={loginInput.loginPassword} type="text" name="loginPassword" onChange={handleLoginInput} />
                <br />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default Loginform;
