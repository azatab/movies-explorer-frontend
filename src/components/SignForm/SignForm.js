import React from "react";
import { Link } from "react-router-dom";
import FormValidation from "../FormValidation/formvalidation";
import Logo from "../Logo/Logo";
import './SignForm.css'

const SignForm = ({...props}) => {
  const { values, handleChange, errors, isValid, resetForm } = FormValidation();

  const submit = (e) => {
    e.preventDefault();
    props.onSubmit(values);
  }

  const handleInputChange = (e) => {
    handleChange(e);
    if (props.errorMsg.length > 0) {props.setErrorMsg("")}
  }
  const handleFormReset = () => {
    resetForm();
    props.setErrorMsg("");
  }

  return (
    <section className="sign">
      <Logo />
      <h2 className="sign__title">{props.title}</h2>
      <form className="sign__form" onSubmit={submit}>
        <label className={props.regForm ? "sign__label" : "sign__label sign__label_inactive"} htmlFor="name">
          Имя
          <input 
            className="sign__input"
            name="name"
            type="text"
            minLength="2"
            maxLength="30"
            onChange={handleInputChange}
            value={values.name || !props.regForm ? " " : ""}
            required
            pattern="[а-яА-Яaa-zA-ZёЁ\- ]{1,}"
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
            onChange={handleInputChange}
            value={values.email || ""}
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
            onChange={handleInputChange}
            value={values.password || ""}
          />
          <span className="sign__error">{errors.password || ''}</span>
        </label>
        <span className="sign__server-error">{props.errorMsg}</span>
        <button 
          className={isValid ? "sign__submit" : "sign__submit sign__submit_inactive"} 
          type="submit" 
          disabled={!isValid}>
          {props.submitText}
        </button>
      
      <p className="sign__redir-text">
        {props.text}
        {props.regForm ? <Link className="sign__link" to="/signin" onClick={handleFormReset}>{props.linkText}</Link>
          : <Link className="sign__link" to ="/signup" onClick={handleFormReset}>{props.linkText}</Link>}
      </p>
      </form>
    </section>
  );
}

export default SignForm;