import React from 'react';
import { useState } from 'react'
import Modal from 'react-modal';
import Loginform from './loginform';
import Signupform from './signupform';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Searchbar from './searchbar';



const Nav = ({ allPosts, setAllPosts, updatePosts }) => {
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
            borderRadius: '30px',
            transform: 'translate(-50%, -50%)',
            marginTop:'35px',
            zIndex:1
        },
    }

    const customStyles2 = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            borderRadius: '30px',
            transform: 'translate(-50%, -50%)',
            zIndex:1,
            marginTop:'35px'
        },
    }
    const [modalIsOpen2, setIsOpen2] = useState(false);
    return (
        <nav className='nav'>
            <div className='pintrest-logo'>
                <Link to="/">
                    <img style={{ height: '32px' }} src="../../public/img/pint.png" alt="img" />
                </Link>
            </div>
            <ul>
                <div className='home-button'>
                    <Link to="/">
                        Home
                    </Link>
                </div>
                {!isLoggedIn && <li onClick={openModal}>
                    Sign Up
                </li>}
                {!isLoggedIn && <li onClick={openModal2}>
                    Log In
                </li>}
                {isLoggedIn && <li onClick={logOut}>
                    Log Out
                </li>}
                {isLoggedIn && <Link style={{ color: "black", textDecoration: "none" }} to="/create-post">
                    Create
                </Link>}
            </ul>
            <Searchbar allPosts={allPosts} updatePosts={updatePosts} />
            <div className='nav-icons'>
                {isLoggedIn && <>
                    <NotificationsIcon className="nav-icon" />
                    <Link to='/profile'>
                        {!user && <div style={{ height: '5px' }}></div>}
                        {user && !user.profileImage && <div style={{ height: '5px' }}></div>}
                        {
                            user && user.profileImage ? <>
                                <div className='profile-image-container-comment nav-icon'>
                                    <img className='profile-image-comment' src={user.profileImage} alt="profile-image" />
                                </div>
                            </> :
                                <AccountCircleIcon />
                        }
                    </Link>
                    <ExpandMoreIcon className="nav-icon" />
                </>}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles2}
                ariaHideApp={false}
            >
                <Signupform closeModal={closeModal} />
            </Modal>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
                ariaHideApp={false}
            >
                <Loginform closeModal2={closeModal2} />
            </Modal>
        </nav>
    );
}

export default Nav;
