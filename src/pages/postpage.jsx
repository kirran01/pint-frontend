import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UploadIcon from '@mui/icons-material/Upload';
import LinkIcon from '@mui/icons-material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Comment from '../components/comment';
import { AuthContext } from '../context/auth.context';

const Postpage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null)
    const [favorited, setFavorited] = useState()
    const { storeToken, user, setUser, authenticateUser } = useContext(AuthContext)
    const [commentInput, setCommentInput] = useState('')

    const removeFromFavorites = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:3000/posts/delete-favorite/${post._id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addToFavorites = (e) => {
        // e.preventDefault()
        axios.put('http://localhost:3000/posts/add-favorite', {
            post: post._id
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    function checkForId(id) {
        const object = user.favorites.find(favorite => favorite._id === id);
        if (object) {
            console.log(`Object found with id ${id}`);
        } else {
            addToFavorites()
            console.log(`Object with id ${id} not found`);
        }
    }

    const handleCommentInput = (e) => {
        setCommentInput(e.target.value)
    }
    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then(post => {
                setPost(post.data)
            })
            .catch(err => {
                console.log(err, "err")
            })
    }, [])
    const addComment = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/comments/create-comment/${post._id}`, {
            comment: commentInput
        },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            .then(res => {
                setPost(res.data)
                setCommentInput('')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='post-page'>
            <div className='post-page-content-card'>
                <div className='post-page-content-img'>
                    {post && <img src={post.image} alt="post" />}
                </div>
                <div className='post-page-content-text'>
                    <div className='post-page-content-icons'>
                        <div className='post-page-content-icons-icons'>
                            <MoreHorizIcon />
                            <UploadIcon />
                            <LinkIcon />
                        </div>
                        <div className='post-page-content-icons-buttons'>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p id="profile-button">Profile</p>
                                <ExpandMoreIcon />
                            </div>
                            {user && post && <p style={{ cursor: 'pointer' }} onClick={(e) => { checkForId(post._id) }} id='save-button'>Save</p>}
                            {user && <button onClick={removeFromFavorites}>remove</button>}
                        </div>
                    </div>
                    <div className='post-page-content-link'>
                        {post && <a href={post.link}>{post.link}</a>}
                    </div>
                    <div className='post-page-content-info'>
                        {post && <p style={{ fontSize: '35px', marginBottom: '0px' }}>{post.title}</p>}
                        {post && <p>{post.description}</p>}
                    </div>
                    <div className='post-page-content-profile'></div>
                    <div className='post-page-content-comments'>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <h3>comments</h3>
                            <ExpandMoreIcon />
                        </div>
                        <div className='comments'>
                            {post &&
                                post.comments.map(comment => {
                                    return (<>
                                        <Comment setPost={setPost} post={post} comment={comment} />
                                    </>)
                                })}
                        </div>
                    </div>
                    <div className='post-page-content-input'>
                        <form>
                            <input value={commentInput} onChange={handleCommentInput} placeholder='Add a comment' type="text" />
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button>Cancel</button>
                                <button onClick={addComment}>Done</button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
            <div className='post-page-scroll-content'></div>
        </div>
    );
}

export default Postpage;
