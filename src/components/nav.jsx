

import React from 'react';
import { useState } from 'react'
import Modal from 'react-modal';

const Nav = () => {
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal2() {
        setIsOpen2(true);
    }
    function closeModal2() {
        setIsOpen2(false);
    }
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const [loginInput, setLoginInput] = useState({
        loginEmail: '',
        loginPassword: ''
    })
    const [signUpInput, setSignUpInput] = useState({
        signUpEmail: '',
        signUpPassword: '',
        signUpAge: ''
    })

    const handleSignUpInput = (e) => {
        setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value })
    }
    const handleLoginInput = (e) => {
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value })
    }


    return (
        <nav className='nav'>
            <ul>
                <li onClick={openModal}>
                    Sign Up
                </li>
                <li onClick={openModal2}>
                    Log in
                </li>
            </ul>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <h2>Sign up</h2>
                <form>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input value={signUpInput.signUpEmail} type="text" name="signUpEmail" onChange={handleSignUpInput} />
                    <br />
                    <label htmlFor="email">Password</label>
                    <br />
                    <input value={signUpInput.signUpPassword} type="text" name="signUpPassword" onChange={handleSignUpInput} />
                    <br />
                    <label htmlFor="email">Age</label>
                    <br />
                    <input value={signUpInput.signUpAge} type="text" name="signUpAge" onChange={handleSignUpInput} />
                    <br />
                    <button type="submit">Continue</button>
                </form>
            </Modal>
            <Modal
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
                contentLabel="Example Modal2"
            >
                <button onClick={closeModal2}>close</button>
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
            </Modal>
        </nav>
    );
}

export default Nav;
