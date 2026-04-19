import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">
          <span className="navbar-logo">🏋️</span>
          <span className="navbar-title">AthletiCore</span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/mood" className="nav-link">Log Mood</Link>
        <Link to="/recommendations" className="nav-link">Recommendations</Link>
      </div>

      <div className="navbar-user">
        {user && <span className="navbar-greeting">Hi, {user.name}</span>}
        <button className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
