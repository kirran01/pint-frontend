import React from 'react';
import axios from 'axios';
import Post from '../components/post';
import AddIcon from '@mui/icons-material/Add';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../context/auth.context';
import { useState, useContext, useEffect } from 'react';

const Profile = ({ allPosts, setAllPosts }) => {
    const { storeToken, user, setUser, authenticateUser } = useContext(AuthContext)
    const [usersPosts, setUsersPosts] = useState([])
    const [fieldToEdit, setFieldToEdit] = useState('')
    const [extendEdit, setExtendEdit] = useState(false)
    const [userEditInput, setUserEditInput] = useState('')
    const [imgInput, setImgInput] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const handleUploadButton = () => {
        if (imgInput) {
            setImgInput(false)
        } else {
            setImgInput(true)
        }
    }
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
                    <form onSubmit={updateUser}>
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
                <button style={{ margin: '5px' }}>Share</button>
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
                <p style={{ margin: '5px 10px 5px' }}>Created</p>
                <p style={{ margin: '5px 10px 5px' }}>Saved</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <AlignHorizontalLeftIcon style={{ margin: '5px 10px 5px' }} />
                <AddIcon style={{ margin: '5px 10px 5px' }} />
            </div>
            <h1>saved</h1>
            {user && <div className='home-posts'>
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
            <hr />
            <h2>Your Posts</h2>
            <div className='home-posts'>
                {usersPosts.map(post => {
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

export default Profile;
