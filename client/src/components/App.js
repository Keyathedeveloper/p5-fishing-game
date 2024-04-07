import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './NavBar';
import Login from './Login';
import Register from './Register';
import PenguinFishGame from './PenguinFishGame';


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
        </Switch>
        <PenguinFishGame />
      </div>
    </Router>
  );
};

export default App;
