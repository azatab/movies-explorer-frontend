import React from 'react';
import './Logo.css'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

const Logo = () => {
  return (
    <Link to='/' className="logo-link">
      <img src={logo} alt='эксплорер фильмов' />
    </Link>
  );
}

export default Logo;