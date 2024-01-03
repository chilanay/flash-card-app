import './navbar.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

function Navbar() {
  return (
    <div className="navbar">
      <div className='navdetails'>
        <NavLink to='/home' className="navpart">Home</NavLink>
        <NavLink to='/flash-cards' className="navpart">Flash Cards</NavLink>
        <NavLink to='/contact-page' className="navpart">Contact Me</NavLink>
      </div>
    </div>
  );
};

export default Navbar;