import React from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css';

const Navigation = () => {
const menu = [
  {
    name: "Фильмы",
    link: "/movies"
  },
  {
    name: "Сохраненные фильмы",
    link: "/saved-movies"
  }
];

  return (
    <nav className="navigation">
      <div className="navigation__links">
        {menu.map((el) => (
          <NavLink
            key={el.link} 
            to={el.link}
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            {el.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;