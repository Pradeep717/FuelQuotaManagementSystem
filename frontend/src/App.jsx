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
import VehicleHome from './Components/VehicleHome/VehicleHome';
import VehicleRegister from './Components/VehicleHome/VehicleRegister/VehicleRegister';
import FuelQuota from './Components/VehicleHome/FuelQuota/FuelQuota';
import Prevlogs from './Components/VehicleHome/Prevlogs/Prevlogs';
import StationHome from './Components/StationHome/StationHome';
import CreateOperator from './Components/StationHome/CreateOperator/CreateOperator';
import QRScan from './Components/StationHome/QRScan/QRScan';
import Operator from './Components/Operator/Operator';
import StationQuota from './Components/StationHome/StationQuota/StationQuota';
import StationLogs from './Components/StationHome/StationLogs/StationLogs';
import StationRegister from './Components/StationHome/StationRegister/StationRegister';
import VDetails from './Components/VehicleHome/VDetails/VDetails';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/admin' element={<AdminHome />} />
      <Route path='/vehicleHome' element={<VehicleHome />} />
      <Route path='/v-register' element={<VehicleRegister />} />
      <Route path='/fuel-quota' element={<FuelQuota/>}/>
      <Route path='/prev-logs' element={<Prevlogs/>}/>
      <Route path='/s-home' element={<StationHome/>}/>
      <Route path='/create-operator' element={<CreateOperator/>}/>
      <Route path='/scan-qr' element={<QRScan/>}/>
      <Route path='/o-home' element={<Operator/>}/>
      <Route path='/s-fuel-quota' element={<StationQuota/>}/>
      <Route path='/s-prev-logs' element={<StationLogs/>}/>
      <Route path='/s-register' element={<StationRegister/>}/>
      <Route path='/vehicle/:id' element={<VDetails />} />
    </Routes>
  </Router>
  )
}

export default App
