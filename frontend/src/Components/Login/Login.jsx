import React from 'react';
import './Login.css'; // Assuming your CSS file is in the same directory
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container-log-sign">
        <div className="login-container" id="login-container">
        {/* Sign In Form */}
        <div className="form-container sign-in-container">
            <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
                <a href="" className="social">
                    <img src="https://img.icons8.com/?size=100&id=118468&format=png&color=1A1A1A" alt="Facebook Icon" />
                </a>
                <a href="#" className="social"><img src="https://img.icons8.com/?size=100&id=TSj6R0n3J3ru&format=png&color=1A1A1A" alt="Google Icon" /></a>
                <a href="#" className="social"><img src="https://img.icons8.com/?size=100&id=ErvuoIU4kAzh&format=png&color=1A1A1A" alt="Linkedin Icon" /></a>
            </div>
            <div className="login-input">
                <span>or use your account</span>
                <input className='input' type="email" placeholder="Email" />
                <input className='input' type="password" placeholder="Password" />
                <a href="#">Forgot your password?</a>
                <button className='button'>Sign In</button>
            </div>
            </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
            <div className="overlay">
            <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn">Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
                <div className='line'>
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start your journey with us</p>
                </div>
                <Link to="/signup">
                    <button className="ghost" id="signUp">Sign Up</button>
                </Link>
             
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Login;
