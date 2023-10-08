// Main — компонент страницы «О проекте»

import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Techs from '../Techs/Techs';
import Footer from '../Footer/Footer';

const Main = () => {
  return(
    <>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </>
  )
};

export default Main;