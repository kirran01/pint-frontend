import React from 'react';
import MagnifyLogo from '../../public/img/magnify.png'

const Searchbar = ({ allPosts, updatePosts }) => {
    const filterResults = (e) => {
        const newPostList = allPosts.filter((post => {
            return post.title
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        }))
        updatePosts(newPostList)
    }
    return (
        <div className='searchbar-container-outer'>
            <span className='searchbar-icon'><img style={{ height: '20px' }} src={MagnifyLogo} alt="" /></span>
            <div className='searchbar-container-inner'>
                <input id="searchbarId" onChange={filterResults} className='searchbar' type="text" placeholder='Search' />
            </div>
        </div>
    );
}

export default Searchbar;
