import React from 'react';
import './SignUp.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="container-log-sign">
      <div className="login-container">
        {/* Sign Up Section (Left Side) */}
        <div className="form-container sign-up-container">
          <h1>Create Account</h1>
          <form action="#">
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
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            {/* <input type="confirmpassword" placeholder="Confirm Password" required /> */}
            <input type="phoneNumber" placeholder="Phone Number" required />
            <div className="role">
              <label htmlFor="Role" style={{ color: "#8280a3" }}>Choose a role: </label>
              <select  name="Role" id="Role" style={{ color: "#8280a3" }}>
                <option value="Vehicle" style={{ color: "#8280a3" }}>Vehicle Owner</option>
                <option value="Station" style={{ color: "#8280a3" }}>Station Owner</option>
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
