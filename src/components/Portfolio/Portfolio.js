// Portfolio — компонент со ссылками на другие проекты

import './Portfolio.css';

const Portfolio = () => {
  return(
    <section className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list">
          <li className="portfolio__project">
            <a href="#" className="portfolio__link">
              Статичный сайт
              <span className="portfolio__link-icon">🡥</span>
            </a>
          </li>
          <li className="portfolio__project">
            <a href="#" className="portfolio__link">
              Адаптивный сайт
              <span className="portfolio__link-icon">🡥</span>
            </a>
          </li>
          <li className="portfolio__project">
            <a href="#" className="portfolio__link">
              Одностраничное приложение
              <span className="portfolio__link-icon">🡥</span>
            </a>
          </li> 
        </ul>
    </section>
  )
};

export default Portfolio;