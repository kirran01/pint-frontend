import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Link, useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

const Comment = ({ post, setPost, comment }) => {
    const [openEdit, setOpenEdit] = useState(false)
    const { user, isLoggedIn, logOut } = useContext(AuthContext);
    const [openEditInput, setOpenEditInput] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [errorMessage, setErrorMessage] = useState(false);
    console.log(comment, 'c')
    const flashError = () => {
        setOpenEdit(false)
        setErrorMessage(true);
        setTimeout(() => {
            setErrorMessage(false);
        }, 2000);
    };

    const submitEditedComment = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/comments/update-comment/${comment._id}`, {
            comment: newComment
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                setOpenEdit(false)
                setOpenEditInput(false)
                setPost(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const deleteComment = (e) => {
        if (comment.owner._id !== user._id) {
            console.log('not the owner')
            flashError()
        } else {
            e.preventDefault()
            axios.delete(`http://localhost:3000/comments/delete/${comment._id}`)
                .then(res => {
                    setPost(res.data)
                    setOpenEdit(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    const openEditBox = () => {
        if (!openEdit) {
            setOpenEdit(true)
        }
        else {
            setOpenEditInput(false)
            setOpenEdit(false)
        }
    }
    return (
        <div className='comment'>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '2px' }}>
                    {
                        comment.owner.profileImage ? <>
                            <Link to={'/user/' + comment.owner._id}>
                                <div className='profile-image-container-comment'>
                                    <img className='profile-image-comment' src={comment.owner.profileImage} alt="profile-image" />
                                </div>
                            </Link>
                        </> :
                            <AccountCircleIcon />
                    }
                    {comment && <h5 style={{ margin: '2px' }}>{comment.owner.username}</h5>}
                </div>
                {openEditInput ? <>
                    <form onSubmit={submitEditedComment}>
                        <input style={{ borderRadius: '5px', border: '1px solid' }} onClick={() => { setOpenEdit(false) }} type="text" value={newComment} onChange={(e) => { setNewComment(e.target.value) }} />
                        <button style={{ padding: '5px', border: 'none', borderRadius: '5px' }} type='submit'>submit</button>
                    </form>
                </> :
                    <p style={{ fontSize: '15px', fontWeight: 'lighter', margin: '2px 5px 5px' }}>{comment.comment}</p>
                }
                {errorMessage && <>
                    <span id='error-message-comment'>Not Authorized</span>
                </>}
            </div>
            <div style={{ display: 'flex', marginLeft: '12px' }}>
                <h5 style={{ margin: '3px 10px 25px' }}>{new Date(post.comments[0].day).toDateString().substring(3)}</h5>
                <h5 style={{ margin: '3px 10px 25px' }}>reply</h5>
                <FavoriteBorderIcon />
                <MoreHorizIcon onClick={openEditBox} />
                {openEdit && <div className='edit-comment-buttons' style={{ display: 'flex', padding: '10px', flexDirection: 'column', margin: '8px' }}>
                    <button onClick={() => {
                        if (comment.owner._id !== user._id) {
                            console.log('not the owner')
                            flashError()
                        } else {
                            setOpenEditInput(true)
                        }
                    }}><p style={{ textAlign: 'left', margin: '10px' }}>Edit</p></button>
                    <button onClick={deleteComment}><p style={{ textAlign: 'left', margin: '10px' }}>Delete</p></button>
                </div>}
            </div>
        </div>
    );
}

export default Comment;
