import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Post from '../components/post';
import AddIcon from '@mui/icons-material/Add';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../context/auth.context';
import { useState, useContext, useEffect } from 'react';
import { Logout } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const Profile = ({ allPosts, setAllPosts, setFilteredPosts }) => {
    const navigate = useNavigate();
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            borderRadius: '30px',
            transform: 'translate(-50%, -50%)',
        },
    }
    const [modalIsOpen, setIsOpen] = useState(false);
    const { storeToken, user, setUser, authenticateUser, logOut } = useContext(AuthContext)
    const [usersPosts, setUsersPosts] = useState([])
    const [createdOrSaved, setCreatedOrSaved] = useState('created')
    const [fieldToEdit, setFieldToEdit] = useState('')
    const [extendEdit, setExtendEdit] = useState(false)
    const [userEditInput, setUserEditInput] = useState('')
    const [deleteInput, setDeleteInput] = useState('')
    useEffect(() => {
        if (user) {
            const headers = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            };
            axios.get("http://localhost:3000/posts/all", headers)
                .then(allPosts => {
                    const thisUsersPosts = allPosts.data.filter(post => {
                        return post.owner === user._id
                    })
                    setUsersPosts(thisUsersPosts)
                })
                .catch(err => {
                    console.log("err", err)
                })
        }
    }, [user])
    const updateUser = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit-user', {
            [fieldToEdit]: userEditInput
        },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        )
            .then(res => {
                setUser(res.data.updatedUser)
                setFieldToEdit('')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const deleteUser = (e) => {
        e.preventDefault()
        if (deleteInput === 'delete') {
            axios.delete(`http://localhost:3000/auth/delete-user/${user._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            .then(res => {
                console.log(res, 'res')
                const filteredAfterDelete = allPosts.filter(post => post.owner !== user._id);
                setFilteredPosts(filteredAfterDelete)
                setExtendEdit(false)
                closeModal()
                setDeleteInput('')
                navigate('/')
                logOut()
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            console.log('input not matching')
        }
    }
    return (
        <div className='profile-page'>
            {user && user.profileImage ? <>
                <div className='profile-image-container'>
                    <img className='profile-image' src={user.profileImage} alt="profile-image" />
                </div>
            </> : <>
                <AccountCircleIcon sx={{ fontSize: 120 }} />
                {fieldToEdit === 'profileImage' && <>
                    <form onSubmit={updateUser}>
                        <input placeholder='Paste Img URL' value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} type="text" />
                        <button>Submit</button>
                        <button onClick={() => {
                            setFieldToEdit('')
                            setUserEditInput('')
                        }}>Cancel</button>
                    </form>
                </>}
            </>
            }
            {user && <>
                {fieldToEdit == "username" ? <>
                    <form onSubmit={updateUser}>
                        <input value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} type="text" />
                        <button>Submit</button>
                        <button onClick={() => {
                            setFieldToEdit('')
                            setUserEditInput('')
                        }}>Cancel</button>
                    </form>
                </> : <>
                    <h1>{user.username}</h1>
                </>}

            </>}
            {user && <>
                {fieldToEdit == "email" ? <>
                    <form onSubmit={() => updateUser(e)}>
                        <input value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} type="text" />
                        <button>Submit</button>
                        <button onClick={() => {
                            setFieldToEdit('')
                            setUserEditInput('')
                        }}>Cancel</button>
                    </form>
                </> : <>
                    <p>{user.email}</p>
                </>}

            </>}
            <div style={{ display: 'flex' }}>
                {!extendEdit ? <button style={{ margin: '5px' }}>Share</button>
                    :
                    <button onClick={openModal} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                }
                {!extendEdit && <button onClick={() => { setExtendEdit(true) }} style={{ margin: '5px' }}>Edit Profile</button>}
                {extendEdit && <>
                    <button onClick={() => {
                        setFieldToEdit('username')
                        setExtendEdit(false)
                    }}>Edit Username</button>
                    <button onClick={() => {
                        setFieldToEdit('email')
                        setExtendEdit(false)
                    }}>Edit Email</button>
                    <button onClick={() => {
                        setFieldToEdit('profileImage')
                        setExtendEdit(false)
                    }}>Change Picture</button>
                    <button onClick={() => { setExtendEdit(false) }}>Cancel</button>
                </>}

            </div>
            <div style={{ display: 'flex' }}>
                <p onClick={() => { setCreatedOrSaved('created') }} style={{ margin: '5px 10px 5px', cursor: 'pointer' }}>Created</p>
                <p onClick={() => { setCreatedOrSaved('saved') }} style={{ margin: '5px 10px 5px', cursor: 'pointer' }}>Saved</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <AlignHorizontalLeftIcon style={{ margin: '5px 10px 5px' }} />
                <AddIcon style={{ margin: '5px 10px 5px' }} />
            </div>
            {createdOrSaved === 'saved' && <h1>Saved</h1>}
            {user && createdOrSaved === 'saved' && <div className='home-posts'>
                {
                    user.favorites.map(post => {
                        return (
                            <>
                                <Post key={post._id} post={post} allPosts={allPosts} setAllPosts={setAllPosts} />
                            </>
                        )
                    })
                }
            </div>}
            {/* <hr /> */}
            {createdOrSaved === 'created' && <h2>Your Posts</h2>}
            <div className='home-posts'>
                {createdOrSaved === 'created' && usersPosts.map(post => {
                    return (
                        <>
                            <Post key={post._id} post={post} allPosts={allPosts} setAllPosts={setAllPosts} />
                        </>
                    )
                })
                }
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }} >
                    <h3>Are you sure you want to Delete your Account?</h3>
                    <form onChange={(e) => { setDeleteInput(e.target.value) }} value={deleteInput} onSubmit={deleteUser} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <input type="text" placeholder='DELETE' />
                        <button>Confirm</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default Profile;
