import {Link} from "react-router-dom";   // use to shift tab without refresh 
import React, { useState, useEffect, useRef } from 'react';
import brandIcon from '/src/assets/Images/Logo.png';
import './Header.css';


function Header() {
    return(
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
                    <button className="button">Logout</button>
                </div>
                
            </nav>
        </div>
    )
}
export default Header;