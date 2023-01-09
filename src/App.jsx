import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/nav'
import Home from './pages/home'
import Createpost from './pages/createpost'
import './App.css'


function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/create-post' element={<Createpost />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
