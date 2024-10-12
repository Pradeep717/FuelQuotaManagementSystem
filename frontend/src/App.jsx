import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Start from './Components/Start/Start'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp';
import { AdminHome } from './Components/AdminHome/AdminHome';
import VehicleHome from './Components/VehicleHome/vehicleHome';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/admin' element={<AdminHome />} />
      <Route path='/vehicleHome' element={<VehicleHome />} />
    </Routes>
  </Router>
  )
}

export default App
