import React from 'react';
import './Login.css'; // Assuming your CSS file is in the same directory

const Login = () => {
  return (
    <div className="container-log-sign">
        <div className="login-container" id="login-container">
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
            <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
                <a href="https://img.icons8.com/?size=100&id=118498&format=png&color=000000" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
            </form>
        </div>

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
                <button className="ghost" id="signUp">Sign Up</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Login;
