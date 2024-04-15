import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './NavBar';
import Login from './Login';
import Register from './Register';
import PenguinFishGame from './PenguinFishGame';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if authentication token exists in localStorage
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleLogin = (username) => {
    // Logic for handling login
    setIsLoggedIn(true);
    // Store authentication token in localStorage
    localStorage.setItem('authToken', 'myAuthTokenHere');
    // Set login message
    setLoginMessage('Login successful!');
    // Set the username in state
    setUsername(username);
  };

  const handleLogout = () => {
    // Logic for handling logout
    setIsLoggedIn(false);
    // Clear authentication token from localStorage
    localStorage.removeItem('authToken');
    // Clear the username
    setUsername('');
  };

  return (
    <Router>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Left section with game and scoreboard */}
        <div style={{ flex: 1 }}>
          {/* Navbar component */}
          <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          {/* Display login message if present */}
          {loginMessage && <p>{loginMessage}</p>}
          {/* Switch component to render routes */}
          <Switch>
            {/* Route for Login component */}
            <Route path="/login">
              <Login onLogin={handleLogin} />
            </Route>
            {/* Route for Register component */}
            <Route path="/register" component={Register} />
          </Switch>
          {/* PenguinFishGame component always rendered */}
          <PenguinFishGame username={username} />
        </div>
      </div>
    </Router>
  );
};

export default App;
