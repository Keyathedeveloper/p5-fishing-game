import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>
      <ul className="nav-list">
        {isLoggedIn && (
          <>
            <li>
              <button className="nav-button" onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <Link to="/account-settings">
                <button className="nav-button">Account Settings</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
