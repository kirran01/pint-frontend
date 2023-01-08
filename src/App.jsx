import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/nav'
import Home from './pages/home'
import './App.css'


function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
       <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
