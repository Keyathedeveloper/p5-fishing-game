import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ handleLogout }) => {
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to="/">
            <button className="nav-button">Login</button>
          </Link>
        </li>
        <li>
          <Link to="/account-settings">
            <button className="nav-button">Account Settings</button>
          </Link>
        </li>
        <li>
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
