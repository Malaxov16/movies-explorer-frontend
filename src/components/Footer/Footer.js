// Footer — презентационный компонент, который отрисовывает подвал

import './Footer.css'

const Footer = () => {
  
  return(
    
    <footer className="footer">
      <p className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__year">© 2023</p>
        <nav className="footer__links">
          <a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
          <a href="https://github.com/Malaxov16/movies-explorer-frontend" className="footer__link">Github</a>
        </nav>
      </div>
    </footer>
  )
};

export default Footer;