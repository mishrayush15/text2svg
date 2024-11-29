import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import LandingPage from './Pages/LandingPage.jsx'


const App = () => {
  
  
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login/google' element={<Login/>}/>
      <Route path='*' element={<h1>404 NOT FOUND</h1>}/>
    </Routes>
  )
}

export default App
