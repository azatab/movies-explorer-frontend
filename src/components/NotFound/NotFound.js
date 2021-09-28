import React from "react";
import { Link, useHistory } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {

  const history = useHistory();
  
  return (
    <main className="page404">
      <h2 className="page404__title">404</h2>
      <p className="page404__text">Страница не найдена</p>
      <Link to="" onClick={() => history.goBack()} className="page404__link">Назад</Link>
    </main>
  );
}

export default NotFound;