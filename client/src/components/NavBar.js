// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to="/login">
            <button className="nav-button">Login</button>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <button className="nav-button">Register</button>
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
