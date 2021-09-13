import './Header.css';
import React from 'react';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = (props) => {
const location = useLocation();

  return (
    <header className={`header ${location.pathname === '/' ? 'header__theme_tiber' : ''}`}>
      <Logo />
      {!props.loggedIn && (
        <nav className="header__menu">
          <Link to='/signup' className="header__link header__link_signup">
            Регистрация
          </Link>
          <Link to='/signin' className="header__link header__link_signin">
            Войти
          </Link>
        </nav>
      )}
      {props.loggedIn && (
        <>
          <Navigation />
          <Link to='/profile' className={`header__link header__link_profile ${location.pathname === '/' ? 'header__link_profile-tiber' : ''}`}>
            Аккаунт
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;