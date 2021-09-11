import React from "react";
import SignForm from "../SignForm/SignForm";

const Login = () => {
  return (
    <SignForm 
      title="Рады видеть!"
      linkText="Регистрация"
      text="Ещё не зарегистрированы?"
      submitText="Войти"
    />
  );
}

export default Login;