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
    const [modalIsOpen2, setIsOpen2] = useState(false);
    return (
        <nav className='nav'>
            <ul>
                <li onClick={openModal}>
                    Sign Up
                </li>
                <li onClick={openModal2}>
                    Log in
                </li>
                <li onClick={logOut}>
                    log out
                </li>
            </ul>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <Signupform />
            </Modal>
            <Modal
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
            >
                <Loginform />
            </Modal>
        </nav>
    );
}

export default Nav;
