import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
const Post = ({ allPosts, setAllPosts, post }) => {

    return (
        <div style={{margin:'5px'}}>
            <div>
                <Link to={'/post/' + post._id}>
                    <img src={post.image} alt="post" />
                    <h6>{post.title}</h6>
                </Link>
            </div>
        </div>
    );
}

export default Post;
