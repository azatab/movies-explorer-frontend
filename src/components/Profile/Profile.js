import React from 'react';
import './Profile.css';
import FormValidation from '../FormValidation/formvalidation';

const Profile = () => {
  const { values, handleChange, errors } = FormValidation();

  return (
    <main className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form">
        <label className="profile__label" htmlFor="name">
          Имя
          <input 
            className="profile__input"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="30"
            required
            onChange={handleChange}
            value={values.name || ''}
          />
        </label>
        <span className="profile__input-error">{errors.name}</span>
        <label className="profile__label" htmlFor="email">
          E-mail
          <input 
            className="profile__input"
            type="email"
            name="email"
            placeholder="E-mail"
            required
            onChange={handleChange}
            value={values.email || ''}
          />
        </label>
        <span className="profile__input-error">{errors.email}</span>
        <button 
          className="profile__button profile__button_edit"
          type="submit"
        >
          Редактировать
        </button>
        <button 
          className="profile__button profile__button_logout"
          type="button"
        >
          Выйти из аккаунта
        </button>
      </form>
    </main>
  );
}

export default Profile;