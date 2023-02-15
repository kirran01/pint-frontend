import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import UploadIcon from '../../public/img/upload.png'

const Createpost = ({ allPosts, setAllPosts, filteredPosts, setFilteredPosts, updatePosts }) => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext);
    const [postInput, setPostInput] = useState({
        title: '',
        description: '',
        link: '',
        imageUrl: '',
    })
    const handlePostInput = (e) => {
        setPostInput({ ...postInput, [e.target.name]: e.target.value })
    }
    const submitPost = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_URL}/posts/create-post`, {
            title: postInput.title,
            description: postInput.description,
            link: postInput.link,
            image: postInput.imageUrl
        }, {
            headers: {
                authorization: `Bearer ${ localStorage.getItem('authToken') }`
            }
        })
            .then(res => {
                setPostInput({
                    title: '',
                    description: '',
                    link: '',
                    imageUrl: ''
                })
                setAllPosts([...allPosts, res.data])
                setFilteredPosts([...filteredPosts, res.data])
                console.log(res.data, "<--created new post")
            })
            .catch(err => {
                console.log(err, "<--err")
            })
    }
    return (
        <div className='create-post-page'>
            <div className='create-post-container'>
                <div className='upload-post-container'>
                    <div className='upload-post'>
                        <div className='upload-post-icon-container'><img className='upload-post-icon' style={{ height: '35px' }} src={UploadIcon} alt="upload-icon" /> <h4>drag and drop  or click to <br />upload</h4></div>
                        <h5>Reccomendation: Use high-quality .jpg files less than 20MB</h5>
                    </div>
                    <div>
                        <button>Save from site</button>
                    </div>
                </div>
                <div className='create-post-form-container'>
                    <form className='create-post-form' onSubmit={submitPost}>
                        <input name='title' value={postInput.title} onChange={handlePostInput} placeholder='Add your title' type="text" />
                        <br />
                        <input name='description' value={postInput.description} onChange={handlePostInput} placeholder='Tell everyone what your Pin is about' type="text" />
                        <br />
                        <input name='link' value={postInput.link} onChange={handlePostInput} placeholder='Add destination link' type="text" />
                        <br />
                        <input name='imageUrl' value={postInput.imageUrl} onChange={handlePostInput} placeholder='URL' type="text" />
                        <br />
                        <div className='create-post-form-button'>
                            <button>Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Createpost;
