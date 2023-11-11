// NotFound - компонент отображается в случае перехода по несуществующему роуту

import { Link, useNavigate } from 'react-router-dom';

import './PageNotFound.css';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      console.log('Назад')
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return(
    <main className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <h2 className='not-found__subtitle'>Страница не найдена</h2>
      <Link className="not-found__link-to-main" to="/" onClick={handleBack}>Назад</Link>
    </main>
  )
};

export default PageNotFound;