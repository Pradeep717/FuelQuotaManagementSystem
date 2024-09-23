import React from 'react';
import './SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  return (
    <div className="container-log-sign">
      <div className="login-container">
        {/* Right side - Sign Up Section (Moved to Left Side) */}
        <div className="form-container sign-up-container">
        <h1>Create Account</h1>
          <form action="#">
            <div className="social-container">
                <a href="" className="social">
                    <img src="https://img.icons8.com/?size=100&id=118468&format=png&color=1A1A1A" alt="Facebook Icon" />
                </a>
                <a href="#" className="social"><img src="https://img.icons8.com/?size=100&id=TSj6R0n3J3ru&format=png&color=1A1A1A" alt="Google Icon" /></a>
                <a href="#" className="social"><img src="https://img.icons8.com/?size=100&id=ErvuoIU4kAzh&format=png&color=1A1A1A" alt="Linkedin Icon" /></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className='button'>Sign Up</button>
          </form>
        </div>

        {/* Left side - Sign In Section (Moved to Right Side) */}
        <div className="overlay-panel overlay-right">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button className="ghost button" id="signIn">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
