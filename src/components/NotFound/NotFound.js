import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css';

const NotFound = ({ linkBack }) => {
  return (
    <main className="page404">
      <h2 className="page404__title">404</h2>
      <p className="page404__text">Страница не найдена</p>
      <Link to={linkBack} className="page404__link">Назад</Link>
    </main>
  );
}

export default NotFound;