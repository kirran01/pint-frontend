import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
const Post = ({ allPosts, setAllPosts, post }) => {
    
    return (
        <div>
            <Link to={'/post/'+post._id}>
            <img src={post.image} alt="post" />
            <h6>{post.title}</h6>
            </Link>
        </div>
    );
}

export default Post;
