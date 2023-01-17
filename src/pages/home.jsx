import React from 'react';
import Post from '../components/post';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Home = ({ allPosts, filteredPosts, setAllPosts }) => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext)
    return (
        <div className='home-page'>
            <div className='home-posts'>
                {
                    filteredPosts.map(post => {
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
