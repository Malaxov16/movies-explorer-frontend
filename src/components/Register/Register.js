// register — компонент страницы авторизации

import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './Register.css';

const Register = () => {

  const handleSubmit = () => {
    console.log('Авторизация');
  };

  return(
    <section className="register">
      <div className='register__component'>
        <Logo />
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form">
          <label for="name" className="register__label">Имя</label>
          <input type="text" id="name" required className="register__field"/>
          <label for="email" className="register__label">E-mail</label>
          <input type="email" id="email" required className="register__field"/>
          <label for="password" className="register__label">Пароль</label>
          <input type="password" id="password" className="register__field" />
          <p className='register__error'>Ошибка</p>
          <button type="button" className="register__button" onSubmit={handleSubmit}>Зарегистрироваться</button>
        </form>
        <div className="register__footer">
          <p className="register__footer-subtitle">Уже зарегистрированы?&nbsp;</p>
          <Link to="/signin" className="register__footer-link">Войти</Link>
        </div>
      </div>
    </section>
  )
}

export default Register;