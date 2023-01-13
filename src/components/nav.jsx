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
            borderRadius: '30px',
            transform: 'translate(-50%, -50%)',
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
                <li onClick={openModal}>
                    Sign Up
                </li>
                <li onClick={openModal2}>
                    Log In
                </li>
                <li onClick={logOut}>
                    Log Out
                </li>

                <Link style={{color:"black",textDecoration:"none"}} to="/create-post">
                    Create
                </Link>
              
            </ul>
            <div className='searchbar-container-outer'>
                <span className='searchbar-icon'><img style={{ height: '20px' }} src="../../public/img/magnify.png" alt="" /></span>
                <div className='searchbar-container-inner'>
                    <input id="searchbarId" className='searchbar' type="text" placeholder='Search' />
                </div>
            </div>
            <div className='nav-icons'>
                <NotificationsIcon className="nav-icon" />
                <ChatBubbleIcon className="nav-icon" />
                <AccountCircleIcon className="nav-icon" />
                <ExpandMoreIcon className="nav-icon" />
            </div>
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
