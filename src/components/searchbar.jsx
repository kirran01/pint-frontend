import React from 'react';

const Searchbar = ({ allPosts, setAllPosts, filteredPosts, setFilteredPosts }) => {
    const filterResults = (e) => {
        const newPostList = allPosts.filter((post => {
            return post.title
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        }))
        setAllPosts(newPostList)
    }
    return (
        <div className='searchbar-container-outer'>
            <span className='searchbar-icon'><img style={{ height: '20px' }} src="../../public/img/magnify.png" alt="" /></span>
            <div className='searchbar-container-inner'>
                <input id="searchbarId" onChange={filterResults} className='searchbar' type="text" placeholder='Search' />
            </div>
        </div>
    );
}

export default Searchbar;
