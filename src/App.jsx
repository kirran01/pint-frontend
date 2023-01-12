import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/nav'
import Home from './pages/home'
import Postpage from './pages/postpage'
import Createpost from './pages/createpost'
import './App.css'


function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/create-post' element={<Createpost />} />
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<Postpage />} />
      </Routes>
    </div>
  )
}

export default App
