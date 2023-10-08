// NotFound - компонент отображается в случае перехода по несуществующему роуту

import { Link } from 'react-router-dom';

import './PageNotFound.css';

const PageNotFound = () => {
  return(
    <section className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <h2 className='not-found__subtitle'>Страница не найдена</h2>
      <Link className="not-found__link-to-main" to="/">Назад</Link>
    </section>
  )
};

export default PageNotFound;