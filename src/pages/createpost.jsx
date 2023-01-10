import React from 'react';

const Createpost = () => {
    return (
        <div className='create-post-page'>
            <div className='create-post-container'>
                <div className='upload-post-container'>
                    <div className='upload-post'>
                        <div className='upload-post-icon-container'><img className='upload-post-icon' style={{ height: '35px' }} src="../../public/img/upload.png" alt="upload-icon" /> <h4>drag and drop  or click to <br />upload</h4></div>

                        <h5>Reccomendation: Use high-quality .jpg files less than 20MB</h5>
                    </div>
                    <button>Save from site</button>
                </div>
                <div className='create-post-form-container'>
                    <form className='create-post-form'>
                        <input placeholder='Add your title' type="text" />
                        <br />
                        <input placeholder='Tell everyone what your Pin is about' type="text" />
                        <br />
                        <input placeholder='Add destination link' type="text" />
                        <br />
                        <input placeholder='URL' type="text" />
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
