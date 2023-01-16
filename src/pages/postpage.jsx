import React from 'react';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { PostAdd } from '@mui/icons-material';
import UploadIcon from '@mui/icons-material/Upload';
import LinkIcon from '@mui/icons-material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Postpage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null)
    const { storeToken, user, authenticateUser } = useContext(AuthContext)
    const [commentInput, setCommentInput] = useState('')
    const handleCommentInput = (e) => {
        setCommentInput(e.target.value)
    }
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
                console.log(res.data)
                setPost(res.data)
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
                            <p id='save-button'>Save</p>
                        </div>
                    </div>
                    <div className='post-page-content-link'>
                        {post && <a href={post.link}>{post.link}</a>}
                    </div>
                    <div className='post-page-content-info'>
                        {post && <p style={{ fontSize: '35px', marginBottom: '0px' }}>{post.title}</p>}
                        {post && <p style={{}}>{post.description}</p>}
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
                                        <div>
                                            <div style={{ display: 'flex' }}>
                                                {/* <img src="" alt="img" /> */}
                                                <div style={{display:'flex', alignItems:'flex-start',marginTop:'2px'}}>
                                                
                                                <AccountCircleIcon/>
                                                <h5 style={{margin:'2px'}}>{post.comments[0].owner.username}</h5>
                                                </div>
                                                <p style={{ fontSize: '15px', fontWeight: 'lighter',margin:'2px 5px 5px' }}>{comment.comment}</p>
                                            </div>
                                            <div style={{ display: 'flex',marginLeft:'12px' }}>
                                                <h5 style={{margin:'3px 10px 25px'}}>{new Date(post.comments[0].day).toDateString().substring(3)}</h5>
                                                <h5 style={{margin:'3px 10px 25px'}}>reply</h5>
                                                <FavoriteBorderIcon />
                                                <MoreHorizIcon />
                                            </div>
                                        </div>
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
