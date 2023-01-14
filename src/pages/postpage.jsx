import React from 'react';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Postpage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null)
    console.log(post, "post")
    useEffect(() => {
        axios.get('http://localhost:3000/posts/all')
            .then(posts => {
                let filteredPosts = posts.data.filter(post => post._id === id)
                setPost(filteredPosts[0])
            })
            .catch(err => {
                console.log(err, "err")
            })
    }, [])
    return (
        <div className='post-page'>
            <div className='post-page-content-card'>
                <div className='post-page-content-img'>
                    {post ? <img src={post.image} alt="post" /> : <><p>loading...</p></>}
                </div>
                <div className='post-page-content-text'>
                    <div className='post-page-content-icons'>X</div>
                    <div className='post-page-content-link'>Link</div>
                    <div className='post-page-content-title'>Title</div>
                    <div className='post-page-content-profile'></div>
                    <div className='post-page-content-comments'>
                        <h3>comments</h3>
                        <div className='comments'>
                            {/* jsx */}
                        </div>
                    </div>
                    <div className='post-page-content-see-more'>see more</div>
                    <div className='post-page-content-input'>
                        <input placeholder='add a comment' type="text" />
                    </div>
                </div>


            </div>
            <div className='post-page-scroll-content'></div>
        </div>
    );
}

export default Postpage;
