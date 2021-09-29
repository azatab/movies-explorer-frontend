import React from "react";
import { useHistory } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
  const history = useHistory();
  
  const handleBackClick = () => {
    
    history.go(-3);
  }
  return (
    <main className="page404">
      <h2 className="page404__title">404</h2>
      <p className="page404__text">Страница не найдена</p>
      <button onClick={handleBackClick} className="page404__link">Назад</button>
    </main>
  );
}

export default NotFound;