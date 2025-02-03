import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import Axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const createUser = async (event) => {
    event.preventDefault();
    
    if (!email || !userName || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      // Send registration request to the server
      const response = await Axios.post('http://localhost:3002/register', {
        email: email,
        userName: userName,
        password: password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('jwtToken', token);  // Store the JWT token in localStorage
      }

      window.location.href = '/dashboard'; // Adjust this as needed

    } catch (error) {
      console.error('Error registering user:', error.response);
      setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="RegisterPage flex">
      <div className="container flex">
        <div className="videoSection">
          <video autoPlay loop muted>
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="textDiv">
            <h2 className="title">Create and Sell Your Art</h2>
            <p>Enjoy Nature's Beauty</p>
          </div>
          <div className="blurredBox">
            <span className="text">Have an account?</span>
            <Link to={'/login'}>
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>
        <div className="formSection">
          <div className="headerDiv">
            <img src="/logo.png" alt="logo" width="200px" />
            <h3>Let us know you!</h3>
          </div>
          <form className="form grid" onSubmit={createUser}>
            <div className="input">
              <label htmlFor="email"></label>
              <div className="input-flex">
                <MdEmail className="icon" />
                <input type="email" id="email" placeholder="Enter Email" required onChange={(event) => setEmail(event.target.value)} />
              </div>
              <label htmlFor="username"></label>
              <div className="input-flex">
                <FaUser className="icon" />
                <input type="text" id="username" placeholder="Enter Username" required onChange={(event) => setUserName(event.target.value)} />
              </div>
              <label htmlFor="password"></label>
              <div className="input-flex">
                <PiPasswordFill className="icon" />
                <input type="password" id="password" placeholder="Enter Password" required onChange={(event) => setPassword(event.target.value)} />
              </div>
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="goot">
            <span className="text">Already have an account?</span>
            <Link to={'/login'}>
              <button className="btn1">Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
