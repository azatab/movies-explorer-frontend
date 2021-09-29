import React from 'react';
import './Profile.css';
import FormValidation from '../FormValidation/formvalidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = (props) => {
  const { values, handleChange, errors, isValid, setValues } = FormValidation();
  const currentUser = React.useContext(CurrentUserContext);

  const handleInputChange = (e) => {
    handleChange(e);
    if (props.errorMsg.length > 0) {props.setErrorMsg("")}
  }

  const updateUserProfile = (e) => {
    e.preventDefault();
    props.handleProfileEdit(values.name, values.email);
  }

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  return (
    <main className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={updateUserProfile}>
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
            onChange={handleInputChange}
            value={values.name || ''}
            pattern="[а-яА-Яaa-zA-ZёЁ\- ]{1,}"
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
            onChange={handleInputChange}
            value={values.email || ''}
          />
        </label>
        <span className="profile__input-error">{errors.email}</span>
        <span className="profile__input-errorMsg">{props.errorMsg}</span>
        <button 
          className={isValid ? "profile__button profile__button_edit" : "profile__button  profile__button_edit profile__button_inactive"}
          type="submit"
          disabled={!isValid}
        >
          Редактировать
        </button>
        <button 
          className="profile__button profile__button_logout"
          type="button"
          onClick={props.handleLogOut}
        >
          Выйти из аккаунта
        </button>
      </form>
    </main>
  );
}

export default Profile;