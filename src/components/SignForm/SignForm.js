import React from "react";
import { Link } from "react-router-dom";
import FormValidation from "../FormValidation/formvalidation";
import Logo from "../Logo/Logo";
import './SignForm.css'

const SignForm = (props) => {
  const { handleChange, errors } = FormValidation();

  return (
    <section className="sign">
      <Logo />
      <h2 className="sign__title">{props.title}</h2>
      <form className="sign__form">
        <label className={props.regForm ? "sign__label" : "sign__label sign__label_inactive"} htmlFor="name">
          Имя
          <input 
            className="sign__input"
            name="name"
            type="text"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
          />
          <span className="sign__error">{errors.name || ''}</span>
        </label>
        <label className="sign__label" htmlFor="email">
          E-mail
          <input 
            className="sign__input"
            name="email"
            type="email"
            required
            onChange={handleChange}
          />
          <span className="sign__error">{errors.email || ''}</span>
        </label>
        <label className="sign__label" htmlFor="password">
          Пароль
          <input 
            className="sign__input"
            name="password"
            type="password"
            required
            onChange={handleChange}
          />
          <span className="sign__error">{errors.password || ''}</span>
        </label>
        <button className="sign__submit" type="submit">{props.submitText}</button>
      </form>
      <p className="sign__redir-text">
        {props.text}
        {props.regForm ? <Link className="sign__link" to="/signin">{props.linkText}</Link>
          : <Link className="sign__link" to ="/signup">{props.linkText}</Link>}
      </p>
    </section>
  );
}

export default SignForm;