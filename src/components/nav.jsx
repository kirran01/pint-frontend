import React from 'react';
import { useState } from 'react'
import Modal from 'react-modal';
import Loginform from './loginform';
import Signupform from './signupform';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';



const Nav = () => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext);
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
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            borderRadius:'30px',
            transform: 'translate(-50%, -50%)',
        },
    }
    const [modalIsOpen2, setIsOpen2] = useState(false);
    return (
        <nav className='nav'>
            <ul>
                <li onClick={openModal}>
                    Sign Up
                </li>
                <li onClick={openModal2}>
                    Log In
                </li>
                <li onClick={logOut}>
                    Log Out
                </li>
            </ul>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <Signupform />
            </Modal>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
            >
                <Loginform />
            </Modal>
        </nav>
    );
}

export default Nav;
