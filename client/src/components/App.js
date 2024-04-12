import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './NavBar';
import Login from './Login';
import Register from './Register';
import Main from './Main'; // Import the Main component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
  };

  return (
    <Router>
      <div style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'center', margin: '10px 0', color: 'darkorange', textShadow: '2px 2px 2px black' }}>Welcome to HungryPenguin!</h1>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Switch>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/main" component={Main} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
