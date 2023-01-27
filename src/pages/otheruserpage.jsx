import React from 'react';
import Post from '../components/post';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
const OtherUserPage = ({ setFilteredPosts }) => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext);
    const { userId } = useParams();
    const [userPosts, setUserPosts] = useState()
    useEffect(() => {
        axios.get('http://localhost:3000/posts/all')
            .then(res => {
                console.log(res.data, 'rd')
                let posts=res.data
                const filteredPosts=posts.filter(post=>post.owner===userId)
                setUserPosts(filteredPosts)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div style={{ marginTop: '100px' }}>
            <h1>username</h1>
            <h2>Posts</h2>
            <div>
            <div className='home-posts'>
                {userPosts&&
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
