import React from "react";
import SignForm from "../SignForm/SignForm";

const Register = ({ handleRegister, errorMsg, setErrorMsg }) => {
  const handleSubmit = (values) => {
    const {name, email, password} = values;
    handleRegister(name, email, password);
  }

  return (
    <SignForm 
      title="Добро пожаловать!"
      linkText="Войти"
      text="Уже зарегистрированы?"
      submitText="Зарегистрироваться"
      regForm
      onSubmit = {handleSubmit}
      errorMsg = {errorMsg}
      setErrorMsg = {setErrorMsg}
    />
  );
}

export default Register;