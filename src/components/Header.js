import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaPlaneDeparture, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">
          <FaPlaneDeparture />
          <span>TripPlanner</span>
        </Link>
      </div>
      <nav className="navigation">
        {user ? (
          <div className="user-profile">
            <FaUserCircle className="profile-icon" />
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-button" title="Logout">
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
