import React from 'react';
import Post from '../components/post';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Home = () => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext)
    const [allPosts, setAllPosts] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/posts/all")
            .then(allPosts => {
                setAllPosts(allPosts.data)
            })
            .catch(err => {
                console.log("err", err)
            })
    }, [])
    return (
        <div className='home-page'>
            <div className='home-posts'>
                {
                    allPosts.map(post => {
                        return (
                            <>
                            <Post key={post._id} post={post} allPosts={allPosts} setAllPosts={setAllPosts} />
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Home;
