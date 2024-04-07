// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Penguin from './Penguin';
import Pond from './Pond';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Logic for handling login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic for handling logout
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Switch>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/register" component={Register} />
          {/* Add other routes */}
        </Switch>
        <div className="game-container">
          <Penguin isLoggedIn={isLoggedIn} />
          <br />
          <Pond />
        </div>
      </div>
    </Router>
  );
};

export default App;
