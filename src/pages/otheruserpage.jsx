import React from 'react';
import Post from '../components/post';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../context/auth.context';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { display } from '@mui/system';
const OtherUserPage = ({ setFilteredPosts }) => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext);
    const { userId } = useParams();
    const [theUser, setTheUser] = useState({})
    const [userPosts, setUserPosts] = useState()
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/posts/all`)
            .then(res => {
                let posts = res.data
                const filteredPosts = posts.filter(post => post.owner === userId)
                setUserPosts(filteredPosts)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3000/auth/get-user/${userId}`, {
            headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
        })
        .then(res => {
            console.log(res.data, 'rd')
            setTheUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}, [])
return (
    <div style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <h1>{theUser.username}</h1>
        {theUser.profileImage ? <>
            <div className='profile-image-container'>
                <img className='profile-image' src={theUser.profileImage} alt="profile-image" />
            </div>
        </> : <>
            <AccountCircleIcon sx={{ fontSize: 120 }} />
        </>}
        <h2>{theUser.username}'s posts</h2>
        <div>
            <div className='home-posts'>
                {userPosts &&
                    userPosts.map(post => {
                        return (
                            <>
                                <Post post={post} />
                            </>
                        )
                    })
                }
            </div>
        </div>
    </div >
);
}

export default OtherUserPage;
