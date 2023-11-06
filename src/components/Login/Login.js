// Login — компонент страницы авторизации

import { Link } from 'react-router-dom';
import { useState } from 'react';

import Logo from '../Logo/Logo';
import './Login.css';
import useFormWithValidation from '../../hooks/useFormWithValidation'

const Login = ({handleLogin}) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.email, values.password);
    resetForm();
  };

  return(
    <main className="login">
      <div className='login__component'>
        <Logo />
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label">E-mail</label>
          <input type="email" id="email" name='email' value={values.email || ''} className="login__field" minLength={2} maxLength={30} pattern='(\w+@\w+\.[A-Za-z]+)' required onChange={handleChange} />
          <span className='login__field-error-msg'>{errors.email}</span>
          <label className="login__label">Пароль</label>
          <input type="password" id="password" name='password' value={values.password || ''} className="login__field" required onChange={handleChange} />
          <span className='login__field-error-msg'>{errors.password}</span>
          <button type="submit" className={`login__button ${!isValid ? 'login__button_disabled' : ''}`} disabled={!isValid}>Войти</button>
        </form>
        <div className="login__footer">
          <p className="login__footer-subtitle">Ещё не зарегистрированы?&nbsp;</p>
          <Link to="/signup" className="login__footer-link">Регистрация</Link>
        </div>
      </div>
    </main>
  )
}

export default Login;