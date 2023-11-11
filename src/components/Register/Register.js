// register — компонент страницы авторизации

import { Link } from 'react-router-dom';
import { useState } from 'react';

import Logo from '../Logo/Logo';
import './Register.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

const Register = ({handleRegister, loggedIn}) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const [formBlock, setFormBlock] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormBlock(true);
    handleRegister(values.name, values.email, values.password);
    setFormBlock(false);
  };

  return(
    <main className="register">
      <div className='register__component'>
        <Logo />
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmit} disabled={formBlock ? 'true' : 'false'}>
          <label className="register__label">Имя</label>
          <input type="text" id="name" name='name' value={values.name || ''} className="register__field" minLength={2} maxLength={30} pattern='([А-Яа-яёA-Za-z \-]+)' required onChange={handleChange}/>
          <span className='register__field-error-msg'>{errors.name}</span>
          <label className="register__label">E-mail</label>
          <input type="email" id="email" name='email' value={values.email || ''} className="register__field" minLength={2} maxLength={30} pattern='(\w+@\w+\.[A-Za-z]+)' required onChange={handleChange}/>
          <span className='register__field-error-msg'>{errors.email}</span>
          <label className="register__label">Пароль</label>
          <input type="password" id="password" name='password' value={values.password || ''} className="register__field" required onChange={handleChange}/>
          <span className='register__field-error-msg'>{errors.password}</span>
          <button type="submit" className={`register__button ${!isValid ? 'register__button_disabled' : ''}`} disabled={!isValid}>Зарегистрироваться</button>
        </form>
        <div className="register__footer">
          <p className="register__footer-subtitle">Уже зарегистрированы?&nbsp;</p>
          <Link to="/signin" className="register__footer-link">Войти</Link>
        </div>
      </div>
    </main>
  )
}

export default Register;