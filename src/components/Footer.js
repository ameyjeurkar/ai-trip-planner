import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSuitcase, FaBook, FaRobot, FaUser } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <NavLink to="/" exact>
        <FaHome />
        <span>Home</span>
      </NavLink>
      <NavLink to="/create-trip">
        <FaSuitcase />
        <span>AI Customised Trips</span>
      </NavLink>
      <NavLink to="/bookings">
        <FaBook />
        <span>Bookings</span>
      </NavLink>
      <NavLink to="/live-companion">
        <FaRobot />
        <span>Companion</span>
      </NavLink>
      <NavLink to="/profile">
        <FaUser />
        <span>Profile</span>
      </NavLink>
    </footer>
  );
};

export default Footer;
