// Navigation - компонент, который отвечает за меню навигации на сайте

import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

import AccountButton from '../AccountButton/AccountButtom';
import MenuPopup from '../MenuPopup/MenuPopup';

import './Navigation.css';
import profileIcon from '../../images/profile.png'

function Navigation ({isLoggedIn}) {
  
  const location = useLocation();
  const [isOpenMenuPopup, setIsOpenMenuPopup] = useState(false);


  function openMenuPopup() {
    setIsOpenMenuPopup(true);
  }

  function closeMenuPopup() {
    setIsOpenMenuPopup(false);
  }

  return(
    <>
      {
        isLoggedIn ? (
          <>
            <nav className='navigation navigation_visible_hide'>
              <NavLink to="/movies" className={`navigation__link ${location.pathname === "/" ? "navigation__link_home-page" : ""}`}>Фильмы</NavLink>
              <NavLink to="/saved-movies" className={`navigation__link ${location.pathname === "/" ? "navigation__link_home-page" : ""} `}>Сохраненные фильмы</NavLink>
            </nav>
            <div className='navigation navigation_visible_hide'>
              <AccountButton />
            </div>
            <button type='button' className={`navigation__menu-button ${location.pathname === '/'? 'navigation__menu-button_home-page' : ''}`} onClick={openMenuPopup}/>
          </>
        ) : (
          <div className='navigation'>
            <Link to="/signup" className="navigation__link navigation__link_auth">Регистрация</Link>
            <Link to="/signin" className="navigation__link navigation__link_auth navigation__link_login">Войти</Link>
          </div>
        )
      }
      <MenuPopup isOpen={isOpenMenuPopup} onClose={closeMenuPopup} />
    </>
  )
};

export default Navigation;