import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Start from './Components/Start/Start'
import Login from './Components/Login/Login'
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  )
}

export default App
