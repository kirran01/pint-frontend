import React from 'react';
import axios from 'axios';
import Post from '../components/post';
import AddIcon from '@mui/icons-material/Add';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../context/auth.context';
import { useState, useContext, useEffect } from 'react';

const Profile = ({}) => {
    const { storeToken, user, authenticateUser } = useContext(AuthContext)
    const [usersPosts, setUsersPosts] = useState([])

    useEffect(() => {
        console.log('running use effect')
        if (user) {
            const headers = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            };
            axios.get("http://localhost:3000/posts/all", headers)
                .then(allPosts => {
                    console.log(user)
                    const thisUsersPosts = allPosts.data.filter(post => {
                        return post.owner === user._id
                    })
                    setUsersPosts(thisUsersPosts)
                    console.log(thisUsersPosts, "typ")
                })
                .catch(err => {
                    console.log("err", err)
                })
        }
    },[user])
    console.log('right before render..')
    return (
        <div className='profile-page'>
            <AccountCircleIcon sx={{ fontSize: 120 }} />
            {user && <h1>{user.username}</h1>}
            {user && <p>@{user.username}</p>}
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
            <h1>saved</h1>
            <div className='saved-posts-container'>
                <div className='saved-post'>
                    <p>postlist</p>
                </div>
            </div>
            <hr />
            <h2>Your Posts</h2>
            <div className='profile-own-posts'>
                {usersPosts.map(post => {
                    return (
                        <>
                            <Post post={post} allPosts={allPosts} setAllPosts={setAllPosts}/>
                        </>
                    )
                })
                }
            </div>
        </div>
    );
}

export default Profile;
