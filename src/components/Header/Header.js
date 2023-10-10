// Header - компонент, который отрисовывает шапку сайта на страницу

import { React } from "react";
import { Link, useLocation } from "react-router-dom";

import Navigation from '../Navigation/Navigation';
import Logo from "../Logo/Logo";

import './Header.css';

function Header({isLoggedIn}){
  const location = useLocation();
  return(
    <header className={`header ${location.pathname === "/" ? "header_home-page" : ""}`}>
      <Logo />
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  )
};

export default Header;