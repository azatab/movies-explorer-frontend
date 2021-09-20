import React from "react";
import SignForm from "../SignForm/SignForm";

const Login = ({ handleLogin, errorMsg, setErrorMsg }) => {
  
  const handleSubmit = (values) => {
    // if (!values.email || !values.password) return;

    const {email, password} = values;
    handleLogin(email, password);
  }

  return (
    <SignForm 
      title="Рады видеть!"
      linkText="Регистрация"
      text="Ещё не зарегистрированы?"
      submitText="Войти"
      onSubmit = {handleSubmit}
      errorMsg = {errorMsg}
      setErrorMsg = {setErrorMsg}
    />
  );
}

export default Login;