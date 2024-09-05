import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="container login-container">
        <div class="main-box">
                <h1>Log In</h1>
                <form action="">
                    <div class="input-box">
                        <span class="icon"><i data-feather="mail"></i></span>
                        <input type="email" required/>
                        <label>Email</label>
                    </div>
                    <div class="input-box">
                        <span class="icon"><i data-feather="lock"></i></span>
                        <input type="password" required/>
                        <label>Password</label>
                    </div>
                    <div class="check">
                        <label><input type="checkbox"/>Remeber me</label>
                        <a href="#">Forget Password</a>
                    </div>
                    <button type="submit" class="btn">Login</button>
                    <div class="register">
                        <p>Don't have an account?<a href="/signup.html" class="register-link">Sign Up</a></p>
                    </div>
                </form>
            </div>
    </div>
  );
}

export default Login;