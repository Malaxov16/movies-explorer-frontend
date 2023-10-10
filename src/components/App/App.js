import './App.css';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/main';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import moviesList from '../../utils/consts';

function App() {
  const routesFooter = [
    '/',
    '/movies',
    '/saved-movies',
 ]

  const [loggedIn, setLoggedIn] = useState(true);
  const [movies, setMovies] = useState([]);

  function setLogin() {
    setLoggedIn(true);
  };

  function handleLogin() {
    setLogin();
  }

  function handleCardCLick () {
    console.log('Клик по карточке');
  };

  function handleCardSave() {
    console.log('Добавить карточку в сохраненные фильмы.');
  }

  function handleCardDelete() {
    console.log('Карточка удалена из сохраненных');
  }

  function handleRegister() {
    console.log('Регистрация')
  }

  useEffect(() => {
    setMovies(moviesList)
  }, [])

  return (
    <div className="body">     
      <div className='page'>
        <Routes>
          <Route path='/' element={<Header isLoggedIn={loggedIn} />} />
          <Route path='/profile' element={<Header isLoggedIn={loggedIn} />} />
          <Route path='/movies' element={<Header isLoggedIn={loggedIn} />} />
          <Route path='/saved-movies' element={<Header isLoggedIn={loggedIn} />} />
        </Routes>
        <Routes>
            <Route element={loggedIn ? <Navigate to='/' replace='true' /> : <Navigate to='/signin' replace='true' />} />
            <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
            <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
            <Route path='/' element={<Main isLoggedIn={loggedIn} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/movies' element={<Movies movies={moviesList} />} />
            <Route path='/saved-movies' element={<SavedMovies movies={moviesList} />} />
            <Route path='*' element={ <PageNotFound />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Footer />} />
          <Route path='/movies' element={<Footer />} />
          <Route path='/saved-movies' element={<Footer />} />
        </Routes>
               
      </div>
    </div>
  );
}

export default App;
