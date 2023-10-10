// Login — компонент страницы авторизации

import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './Login.css';

const Login = () => {

  const handleSubmit = () => {
    console.log('Авторизация');
  };

  return(
    <main className="login">
      <div className='login__component'>
        <Logo />
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form">
          <label for="email" className="login__label">E-mail</label>
          <input type="email" id="email" required className="login__field"/>
          <label for="password" className="login__label">Пароль</label>
          <input type="password" id="password" className="login__field" />
          <p className='login__error'>Ошибка</p>
          <button type="button" className="login__button" onSubmit={handleSubmit}>Войти</button>
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