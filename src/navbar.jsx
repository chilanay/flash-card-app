import './navbar.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

function Navbar() {
  return (
    <div className="navbar">
      <div className='pages'>
        <NavLink to='/home' className="page">Home</NavLink>
        <NavLink to='/flash-cards' className="page">Flash Cards</NavLink>
        {/* <NavLink to='/contact' className="page">Contact Me</NavLink> */}
      </div>
    </div>
  );
};

export default Navbar;