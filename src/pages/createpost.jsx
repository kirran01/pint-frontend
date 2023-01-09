import React from 'react';

const Createpost = () => {
    return (
        <div className='create-post-page'>
            <div className='create-post-container'>
                <form className='create-post-form'>
                    <input placeholder='Add your title' type="text" />
                    <input placeholder='Tell everyone what your Pin is about' type="text" />
                    <input placeholder='Add destination link' type="text" />
                    <input placeholder='URL' type="text" />
                    <button>Upload</button>
                </form>
            </div>
        </div>
    );
}

export default Createpost;
