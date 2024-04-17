import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { getCookie } from './CookieUtils'; // Import the getCookie function
import '../index.css'; // Import the index.css file
import Penguin from './Penguin';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Check if the user is already logged in and redirect to PenguinFishGame if true
    const sessionToken = getCookie('sessionToken');
    if (sessionToken) {
      history.push('/');
    }
  }, [history]);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Logging in...'); // Add console log
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      console.log('Login successful:', response.data); // Add console log
      // Set the session token as a cookie
      document.cookie = `sessionToken=${response.data.sessionToken}; path=/`;
      setEmail('');
      setPassword('');
      setErrorMessage('');
      history.push('/penguinfishgame');
    } catch (error) {
      console.error('Login error:', error); // Add console log
      // Handle error
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'grey', textShadow: '2px 2px 2px black' }}>🐧HungryPenguin🐧</h1>
      </div>
      <div style={{ textAlign: 'center' }}>
        <form onSubmit={handleLogin} style={{ display: 'inline-block' }}>
          <label>
            Email:
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p> {/* Link to the registration page */}
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <Penguin />
    </div>
  );
}

export default App;
