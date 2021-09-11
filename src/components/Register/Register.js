import React from "react";
import SignForm from "../SignForm/SignForm";

const Register = () => {
  return (
    <SignForm 
      title="Добро пожаловать!"
      linkText="Войти"
      text="Уже зарегистрированы?"
      submitText="Зарегистрироваться"
      regForm
    />
  );
}

export default Register;