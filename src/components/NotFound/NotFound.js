import React from "react";
import { /*Link,*/ useHistory } from "react-router-dom";
import './NotFound.css';

//const NotFound = () => {
function NotFound() {
  const history = useHistory();
  // const handleBackClick = () => {
  //   history.goBack();
  // }
//<Link to="" onClick={handleBackClick} className="page404__link">Назад</Link>
  return (
    <main className="page404">
      <h2 className="page404__title">404</h2>
      <p className="page404__text">Страница не найдена</p>
      <button onClick={() => history.goBack()} className="page404__link">Назад</button>
    </main>
  );
}

export default NotFound;