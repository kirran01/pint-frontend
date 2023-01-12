import React from 'react';

const Post = ({ allPosts, setAllPosts, post }) => {
    return (
        <div className='post'>
            <div className='post-img'>
                <img src={post.image} alt="post" />
            </div>
            <div className='post-caption'>
                <h5 style={{ margin: '9px' }}>{post.description}</h5>
            </div>
        </div>
    );
}

export default Post;
