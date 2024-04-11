import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './NavBar';
import Login from './Login';
import Register from './Register';
import PenguinFishGame from './PenguinFishGame';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if authentication token exists in localStorage
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleLogin = () => {
    // Logic for handling login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic for handling logout
    setIsLoggedIn(false);
    // Clear authentication token from localStorage
    localStorage.removeItem('authToken');
  };

  return (
    <Router>
      <div>
        {/* Navbar component */}
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

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
        <PenguinFishGame />
      </div>
    </Router>
  );
};

export default App;
