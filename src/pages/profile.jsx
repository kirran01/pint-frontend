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
    const [imgInput, setImgInput] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const handleUploadButton = () => {
        if (imgInput) {
            setImgInput(false)
        } else {
            setImgInput(true)
        }
    }
    console.log(user, 'u')
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
    const submitImgURL = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit-user', {
            profileImage: imgUrl
        },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        )
            .then(res => {
                setUser(res.data.updatedUser)
                storeToken(res.data.updatedToken)
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
                <button type="button" onClick={handleUploadButton}>{!imgInput ? <>upload</> : <>cancel</>}</button>
                {imgInput && <>
                    <form onSubmit={submitImgURL}>
                        <input onChange={(e) => { setImgUrl(e.target.value) }} value={imgUrl} type="text" placeholder='ImageURL' />
                        <button onClick={() => { setImgInput(false) }}>submit</button>
                    </form>

                </>}
            </>
            }
            {user && <h1>{user.username}</h1>}
            {user && <p>@{user.username}</p>}
            <div style={{ display: 'flex' }}>
                <button style={{ margin: '5px' }}>Share</button>
                <button style={{ margin: '5px' }}>Edit Profile</button>
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
            <div className='saved-posts-container'>
                <div className='saved-post'>
                    <p>postlist</p>
                </div>
            </div>
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
