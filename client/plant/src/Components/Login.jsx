import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import axios from 'axios';  // You need to install axios for API requests

const Login = () => {
  // States for the form inputs
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const sorry=()=>{
    alert("Even I keep forgetting passcode,Please make a new account and try to remember it next time xD")
  }
  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!userName || !password) {
      setErrorMessage('Both username and password are required');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(''); // Clear previous error

      // Send login request to the server
      const response = await axios.post('http://localhost:3002/login', {
        userName,
        password
      });

      // Assuming the backend sends the JWT token as 'token' in the response
      const { token } = response.data;

      if (token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', token);
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }

    } catch (error) {
      console.error('Login failed:', error.response);
      setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoSection">
          <video autoPlay loop muted>
            <source src={`./public/video.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="textDiv">
            <h2 className="title">Create and Sell Your Art</h2>
            <p>Enjoy Nature's Beauty</p>
          </div>
          <div className="blurredBox">
            <span className="text">No account?</span>
            <Link to={'/register'}>
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formSection">
          <div className="headerDiv">
            <img src={`./public/logo.png`} alt="logo" width="200px" />
            <h3>Welcome!</h3>
          </div>
          <form onSubmit={handleLogin} className="form grid">
            <div className="input">
              <label htmlFor="username"></label>
              <div className="input-flex"> 
                <FaUser className="icon"/>
                <input 
                  type="text" 
                  id="username" 
                  placeholder="Enter Username" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                />
              </div>

              <label htmlFor="password"></label>
              <div className="input-lex"> 
                <PiPasswordFill className="icon"/>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter Passcode" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>}

            <button type="submit" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </button>

            <span className="forgot" onClick={sorry}><a href="#">Forgot Password?</a></span>
          </form>

          <div className="goot">
            <span className="text">No account?</span>
            <Link to={'/register'}>
              <button className="btn1">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
