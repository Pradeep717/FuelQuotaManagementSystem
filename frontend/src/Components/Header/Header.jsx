import { Link, useNavigate } from 'react-router-dom';   // use to shift tab without refresh 
import React, { useState, useEffect, useRef } from 'react';
import brandIcon from '/src/assets/Images/Logo.png';
import './Header.css';

import axios from '../../api/api'; // Adjust path to your axios instance

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout'); // Send logout request
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="header-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={brandIcon} alt="Brand Icon" />
          <div className="brand-name">
            <span>Fuel</span>
            <span className='highlightedText'>Plus</span>
            <span>Station</span>
          </div>
        </div>
        <div className="navbar-info">
          <div>Home</div>
          <div>Orders</div>
          <div>Profile</div>
          <div>About</div>
        </div>
        <div className="logout">
          <button onClick={handleLogout} className="button">Logout</button>
        </div>
      </nav>
    </div>
  );
}

export default Header;

