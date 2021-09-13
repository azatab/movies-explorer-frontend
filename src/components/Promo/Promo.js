import React from 'react';
import NavTab from '../NavTab/NavTab';
import './Promo.css';
import promologo from '../../images/promologo.png';

const Promo = () => {
  return (
    <section className="promo">
      <img src={promologo} className="promo__logo" alt="глобус" />
      <div className="promo__info">
        <h1 className="promo__title">
          Учебный проект студента факультета
          {' '}
          <span className="promo__title-cont"> Веб-разработки.</span>
        </h1>
        <p className="promo__description">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
      </div>
      <NavTab />
    </section>
  );
}

export default Promo;