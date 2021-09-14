import './Header.css';
import React from 'react';
import Logo from '../Logo/Logo';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = (props) => {
const location = useLocation();
  return (
    <header className={`header ${location.pathname === '/' ? 'header__theme_tiber' : ''}`}>
      <Logo />
      <Navigation loggedIn={props.loggedIn} />
    </header>
  );
};

export default Header;