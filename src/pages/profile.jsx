import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../context/auth.context';
import { useState, useContext, useEffect } from 'react';

const Profile = () => {
    const { storeToken, user, authenticateUser } = useContext(AuthContext)
    console.log(user, "user")
    return (
        <div className='profile-page'>
            <AccountCircleIcon sx={{ fontSize: 120 }} />
            {user && <h1>{user.name}</h1>}
            {user && <p>@{user.name}</p>}
            <div style={{ display: 'flex' }}>
                <button style={{ margin: '5px' }}>Share</button>
                <button style={{ margin: '5px' }}>Edit Profile</button>
            </div>
            <div style={{ display: 'flex' }}>
                <p style={{ margin: '5px 10px 5px' }}>Created</p>
                <p style={{ margin: '5px 10px 5px' }}>Saved</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <AlignHorizontalLeftIcon style={{ margin: '5px 10px 5px' }} />
                <AddIcon style={{ margin: '5px 10px 5px' }} />
            </div>
        </div>
    );
}

export default Profile;
