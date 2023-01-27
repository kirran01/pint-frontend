import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Nav from './components/nav'
import Home from './pages/home'
import Profile from './pages/profile'
import Postpage from './pages/postpage'
import OtherUserPage from './pages/otheruserpage'
import Createpost from './pages/createpost'
import './App.css'


function App() {
  const [allPosts, setAllPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const updatePosts = (updatedPosts) => {
    setFilteredPosts(updatedPosts)
  }
  useEffect(() => {
    const headers = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    };
    axios.get("http://localhost:3000/posts/all", headers)
      .then(allPosts => {
        setAllPosts(allPosts.data)
        setFilteredPosts(allPosts.data)
      })
      .catch(err => {
        console.log("err", err)
      })
  }, [])
  return (
    <div className="App">
      <Nav allPosts={allPosts} setAllPosts={setAllPosts} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} updatePosts={updatePosts} />
      <Routes>
        <Route path='/create-post' element={<Createpost allPosts={allPosts} setAllPosts={setAllPosts} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} />} />
        <Route path='/' element={<Home allPosts={allPosts} setAllPosts={setAllPosts} filteredPosts={filteredPosts} />} />
        <Route path='/post/:id' element={<Postpage />} />
        <Route path='/profile' element={<Profile allPosts={allPosts} setAllPosts={setAllPosts} setFilteredPosts={setFilteredPosts} />} />
        <Route path='/user/:userId' element={<OtherUserPage />} />
      </Routes>
    </div>
  )
}

export default App
