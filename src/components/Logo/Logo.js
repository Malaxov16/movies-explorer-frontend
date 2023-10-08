// Logo - компонент логотипа, который открывает переадресует на домашнюю страницу

import { Link } from 'react-router-dom';

import './Logo.css';
import logoImage from '../../images/logo.svg';

const Logo = () => {
  return(
    <Link to="/" className="logo">
      <img src={logoImage} className="logo__image" alt="Логотип"></img>
    </Link>
  )
}

export default Logo;