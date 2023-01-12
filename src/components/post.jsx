import React from 'react';

const Post = ({ allPosts, setAllPosts, post }) => {
    return (
        <div>
            <img src={post.image} alt="post" />
            <h6>{post.title}</h6>
        </div>
    );
}

export default Post;
