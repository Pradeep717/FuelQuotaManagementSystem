import React, { useState } from 'react';
import './SignUp.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';

import { signupUser } from '../../api/api'; // Import the signup function


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'vehicle_owner' // Default role
  });
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await signupUser(formData); // Call the signup function
      navigate('/login'); // Redirect to the login page after successful signup
    } catch (error) {
      console.error('Signup failed:', error);
      // You can also display an error message to the user if needed
    }
  };

  return (
    <div className="container-log-sign">
      <div className="login-container">
        {/* Sign Up Section (Left Side) */}
        <div className="form-container sign-up-container">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="social-container">
              <a href="#" className="social">
                <img src="https://img.icons8.com/?size=100&id=118468&format=png&color=1A1A1A" alt="Facebook Icon" />
              </a>
              <a href="#" className="social">
                <img src="https://img.icons8.com/?size=100&id=TSj6R0n3J3ru&format=png&color=1A1A1A" alt="Google Icon" />
              </a>
              <a href="#" className="social">
                <img src="https://img.icons8.com/?size=100&id=ErvuoIU4kAzh&format=png&color=1A1A1A" alt="LinkedIn Icon" />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <input type="phoneNumber" name="phoneNumber" placeholder="Phone Number" required onChange={handleChange} />
            <div className="role">
              <label htmlFor="Role">Choose a role: </label>
              <select name="role" id="Role" onChange={handleChange}>
              <option value="vehicle_owner">Vehicle Owner</option>
              <option value="station_owner">Station Owner</option>
              </select>
            </div>

            <button className="button">Sign Up</button>
          </form>
        </div>

        {/* Sign In Section (Right Side) */}
        <div className="overlay-panel overlay-right">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us, please login with your personal info</p>
          <Link to="/login">
            <button className="ghost button" id="signIn">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
