// Portfolio — компонент со ссылками на другие проекты

import './Portfolio.css';

const Portfolio = () => {
  return(
    <section className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list">
          <li className="portfolio__project">
            <a href="https://github.com/Malaxov16/how-to-learn" className="portfolio__link" target='_blank' rel='noreferrer'>
              Статичный сайт
              <span className="portfolio__link-icon">↗</span>
            </a>
          </li>
          <li className="portfolio__project">
            <a href="https://github.com/Malaxov16/russian-travel" className="portfolio__link" target='_blank' rel='noreferrer'>
              Адаптивный сайт
              <span className="portfolio__link-icon">↗</span>
            </a>
          </li>
          <li className="portfolio__project">
            <a href="https://github.com/Malaxov16/react-mesto-api-full-gha" className="portfolio__link" target='_blank' rel='noreferrer'>
              Одностраничное приложение
              <span className="portfolio__link-icon">↗</span>
            </a>
          </li> 
        </ul>
    </section>
  )
};

export default Portfolio;