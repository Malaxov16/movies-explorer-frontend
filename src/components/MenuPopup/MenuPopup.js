// MenuPopup - компонент, который отвечает за формат меню при маленьком разрешении

import { Link, NavLink, useLocation } from 'react-router-dom';

import AccountButton from '../AccountButton/AccountButtom';

import './MenuPopup.css';

const MenuPopup = ({isOpen, onClose}) => {
  const location = useLocation();

  function onCloseHendler() {
    onClose();
  }

  return(
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <button type='button' className='popup__close-button' onClick={onCloseHendler} />
      <ul className='popup__list' onClick={onCloseHendler}>
        <li className='popup__item'>
            <NavLink to='/' className='popup__link'>
              Главная
            </NavLink>
        </li>
        <li className='popup__item'>
            <NavLink to='/movies' className='popup__link'>
              Фильмы
            </NavLink>
        </li>
        <li className='popup__item'>
            <NavLink to='/saved-movies' className='popup__link'>
              Сохранённые фильмы
            </NavLink>
        </li >
      </ul>
      <div className='popup__account-button'>
        <AccountButton onClick={onCloseHendler} />
      </div>
    </div>
  )
};

export default MenuPopup;