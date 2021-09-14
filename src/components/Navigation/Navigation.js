import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import './Navigation.css';

const Navigation = (props) => {
  const location = useLocation();
  const [isBurgerMenu, setIsBurgerMenu] = React.useState(false);

  const handleEscClose = (e) => {
    if (e.key === 'Escape') setIsBurgerMenu(false);
  }

  React.useEffect(() => {
    if (isBurgerMenu) document.addEventListener('keydown', handleEscClose);
    else document.removeEventListener('keydown', handleEscClose);
  }, [isBurgerMenu]);

  const showBurgerMenu = () => {
    setIsBurgerMenu(true);
  }

  const closeBurgerMenu = () => {
    setIsBurgerMenu(false);
  }

  return (
    <nav className="navigation">
      {!props.loggedIn && (
        <div className="navigation__links">
          <Link to="/signup" className="navigation__link">Регистрация</Link>
          <Link to="/signin" className="navigation__link navigation__link_signin">Войти</Link>
        </div>
      )}
      {props.loggedIn && (
        <>
          <div className="navigation_logged">
            <div className="navigation__links">
              <NavLink to="/movies" className="navigation__movie" activeClassName="navigation__movie_active">Фильмы</NavLink>
              <NavLink to="/saved-movies" className="navigation__movie" activeClassName="navigation__movie_active">Сохранённые фильмы</NavLink>
            </div>
            <Link to="/profile" className={`navigation__link navigation__link_profile ${location.pathname === '/' ? 'navigation__link_profile-tiber' : ''}`}>Аккаунт</Link>
          </div>
          <button className="navigation__burger-btn" onClick={showBurgerMenu}></button>
        </>
      )}
      {isBurgerMenu && (
        <div className="burger-menu">
          <div className="burger-menu__container">
            <button type="button" className="burger-menu__btn" onClick={closeBurgerMenu}></button>
            <div className="burger-menu__content">
              <div className="burger-menu__links">
                <NavLink className="burger-menu__link" activeClassName="burger-menu__link_active" exact path to="/">Главная</NavLink>
                <NavLink className="burger-menu__link" activeClassName="burger-menu__link_active" exact path to="/movies">Фильмы</NavLink>
                <NavLink className="burger-menu__link" activeClassName="burger-menu__link_active" exact path to="/saved-movies">Сохранённые фильмы</NavLink>
              </div>
              <NavLink className="navigation__link_profile" activeClassName="navigation__link_active" to="/profile">Аккаунт</NavLink>
            </div>
           </div>
        </div>
      )}
      
    </nav>
  )
}

export default Navigation;