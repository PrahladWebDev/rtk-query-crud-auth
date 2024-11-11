import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  
  // Get the username from localStorage
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('username'); // Remove the username from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {username ? (
          <>
            <div className="username-display">
              Welcome, <strong>{username}</strong>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <div className="username-display">Welcome, Guest</div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
