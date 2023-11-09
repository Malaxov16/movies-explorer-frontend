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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import PopupMessage from '../PopupMessage/PopupMessage';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//import moviesList from '../../utils/consts';

import { CurrentUserContext } from '../../constexts/currentUserContext';
import { getUser, login, register, updateUser, getSavedMoviesAPI, saveMovieAPI, deleteMovieAPI } from '../../utils/MainApi';
import { getMoviesMain } from '../../utils/MoviesApi';

function App() {
  //стейт для работы с пользователем
  const [loggedIn, setLoggedIn] = useState(false); //стейт состояния авторизации
  const [currentUser, setCurrentUser] = useState({}) //стейт с данными авторизованного пользователя

  //стейты для работы с фильмами с внешенго ресурса
  const [allMovies, setAllMovies] = useState([]); //стейт со всеми фильмами от внешнего сервиса
  const [nameFilterMovies, setNameFilterMovies] = useState([]); //стейт с массивом фильмов отфильтрованных строке запроса
  const [foundMovies, setFoundMovies] = useState([]); //стейт с массивом фильмов отфильтрованных по строке запроса и признаку короткометражный
  const [checkShortMovie, setCheckShortMovie] = useState(false); //стейт переключателя короткометражек
  const [isLoading, setIsLoading] = useState(false); //стейт для отображения прелоадера во время поиска
  const [errorFind, setErrorFind] = useState(false); //стейт ошибки поиска
  const [notFound, setNotFound] = useState(false); //стейт признак, что фильмы не найдены по заданным условиям поиска
  const [execFind, setExecFind] = useState(false); //стейт признак выполнения поиска
  
  //стейты для работы с сохраненными фильмами
  const [savedMovies, setSavedMovies] = useState([]); //стейт с фильмами пользователя
  const [nameFilterSavedMovies, setNameFilterSavedMovies] = useState([]); //стейт с массивом сохраненных фильмов отфильтрованных строке запроса
  const [foundSavedMovies, setFoundSavedMovies] = useState([]); //стейт с отфильрованными фильмами для страницы с сохраненными фильмами
  const [checkShortSavedMovies, setCheckShorSavedMovies] = useState(false); //стейт переключателя короткометражек на странице с сохраненными фильмами
  const [execFindSavedMovies, setExecFindSavedMovies] = useState(false); ////стейт признак выполнения поиска сохраненных фильмов

  const [msg, setMessage] = useState({});

  const navigate = useNavigate();



  // ------------------------------------------- Функции для работы с пользователем---------------------------

  //устанавливает стейт в true, если пользователь авторизован
  function setLogin() {
    setLoggedIn(true);
  };

  //проверка авторизации пользователя при запуске приложения
  useEffect(() => {
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      getUser(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log('Ошибка проверки акторизации');
          setMessage({isOpen: true, textMessage: 'Ошибка проверки акторизации'});
        }) //вывод ошибки
    }
  }, []);

  //функция авторизации
  function handleLogin(email, password) {
    login(email, password)
      .then((res) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          navigate('/', {replace: true})
          getUser(res.token)
            .then((res) => setCurrentUser(res.data))
            .catch((err) => {
              console.log('Ошибка получения данных пользователя.');
              setMessage({isOpen: true, textMessage: 'Ошибка получения данных пользователя'});
            }) //вывод ошибки
            
        } else {
          console.log('Ошибка получения токена.') //вывод ошибки
          setMessage({isOpen: true, textMessage: 'Ошибка получения токена'});
        }
      })
      .catch((res) => {
        console.log('Ошибка авторизации. ПРоверьте имя пользователя и пароль'); //вывод ошибки
        setMessage({isOpen: true, textMessage: 'Ошибка авторизации. ПРоверьте имя пользователя и пароль'});
      })
  }

  //функция регистрации
  function handleRegister(name, email, password) {
    register(name, email, password)
      .then((res) => {
        if(res.data._id){
          handleLogin(email, password);
        } else {
          console.log('Пользователь зарегистрирован, но произошла ошибка'); //вывод ошибки
          setMessage({isOpen: true, textMessage: 'Пользователь зарегистрирован, но произошла ошибка'});
        };
      })
      .catch((err) => {
        console.log(`Ошибка регистрации: ${err}`); //вывод ошибки
        setMessage({isOpen: true, textMessage: 'Ошибка регистрации'});
      })
  };

  //функция обновления профиля
  function handleUpdateUser(name, email) {
    updateUser(name, email)
      .then((res) => {
        setCurrentUser(res.data);
        setMessage({isOpen: true, textMessage: 'Данные успешно обновлены.'});
      })
      .catch((err) => {
        console.log('Ошибка обновления данных пользователя') //вывод ошибки
        let textMessage;
        if (err === 409) {
          textMessage ='Ошибка. Пользователь с таким email уже существует'
        } else {textMessage ='Ошибка обновления данных пользователя'}
        setMessage({isOpen: true, textMessage: textMessage});
      })
  }

  //функция выхода
  function signOut () {
    localStorage.removeItem('token');
    localStorage.removeItem('searchString');
    localStorage.removeItem('checkShortMovie');
    localStorage.removeItem('foundMovies');
    setLoggedIn(false);
    navigate('/signin', {replace: true});
  }




  //------------------------------------функции для работы с поиском фильмов---------------------------------------------

  //функция фильтрации по тексту строки поиска
  function findNameMovie(movies, searchString) {
    return movies.filter((movie) =>  
    { 
      return movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchString.toLowerCase());
    });
  };

  //функция фильтрации по признаку короткометражный
  function findShortMovies(movies) {
    return movies.filter((movie) => { return movie.duration <= 40 })
  };

  //------------------------------------- функции для работы на странице Фильмы --------------------------------------------

  //функция переключает стейт чекбокса короткометражек
  function switchShortMovie() {
    setCheckShortMovie(!checkShortMovie);
  };

  //функция поиска фильма в массиве по поисковой строке и признаку короткометражный, возвращает массив
  function findMovie(movies, searchString, isCheckShort) {
    localStorage.setItem('searchString', searchString);
    localStorage.setItem('checkShortMovie', isCheckShort);
    const moviesList = findNameMovie(movies, searchString);
    localStorage.setItem('foundMovies', JSON.stringify(moviesList));
    setNameFilterMovies(moviesList);
    if (isCheckShort) {
      return findShortMovies(moviesList);
    } else {
      return moviesList;
    }
  }

  //функция проверки на пустой массив
  function checkNotFound (movies) {
    if (movies.length !== 0) {
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }

  //функция обработчик кнопки "Найти" на форме поиска
  function handleQueryMovies (searchString) {
    setIsLoading(true);
    getMoviesMain()
      .then((res) => {
        setAllMovies(res);
        const movieList = findMovie(res, searchString, checkShortMovie);
        checkNotFound(movieList);
        setFoundMovies(movieList);
        setExecFind(true);
      })
      .catch((err) => {
        setErrorFind(true);
      }) 
      .finally(() => setIsLoading(false));
  };

  //проверка и получение данных о фильмах из локального хранилища
  useEffect(() => {
    if (localStorage.getItem('foundMovies')) {
      setExecFind(true);
      const movieList = JSON.parse(localStorage.getItem('foundMovies'));
      setNameFilterMovies(movieList);
      if (localStorage.getItem('checkShortMovie') === 'true') {
        setCheckShortMovie(true);
        setFoundMovies(findShortMovies(movieList));
      } else {
        setCheckShortMovie(false);
        setFoundMovies(movieList);
      }
    }
  },[loggedIn])

  //поиск короткометражек при переключении чекбокса
  useEffect(() => {
    checkNotFound(nameFilterMovies);
    if (checkShortMovie) {
      const moviesList = findShortMovies(nameFilterMovies);
      checkNotFound(moviesList);
      setFoundMovies(moviesList);
    } else {
      setFoundMovies(nameFilterMovies);
    }
  }, [checkShortMovie, nameFilterMovies]);

  //функция обработчик действия c фильмом
  function handleActionMovie (movie) {
    if(!checkSavedMovies(movie)) {
      saveMovie(movie);
    } else {
      const movieId = savedMovies.find((item) => item.movieId === movie.id)._id;
      deleteMovie(movieId);
    }
  };

  //функция проверки фильма в сохраненных
  function checkSavedMovies (movie) {
    return savedMovies.some((item) => item.movieId === movie.id);
  }

  //функция сохранения фильма
  function saveMovie (movie) {
    saveMovieAPI(movie)
      .then((res) => setSavedMovies([res, ...savedMovies]))
      .catch((err) => {
        console.log('Ошибка сохранения фильма');
        setMessage({isOpen: true, textMessage: 'Ошибка сохранения фильма'});
      });
  };


  //---------------------------------- Работа с сохраненными фильмами --------------------------------------

  
  //функция переключения чекбокса сохраненных фильмов
  function switchShortSavedMovies () {
    setCheckShorSavedMovies(!checkShortSavedMovies);
  }

  //получение фильмов пользователя
  useEffect(() => {
    if(loggedIn) {
    getSavedMoviesAPI()
      .then((res) => {
        setLoggedIn(true);
        setSavedMovies(res.data);
        setNameFilterSavedMovies(res.data);
        setFoundSavedMovies(res.data);
      })
      .catch((err) => {
        console.log('Ошибка получения фильмов пользователя');
        setMessage({isOpen: true, textMessage: 'Ошибка получения фильмов пользователя'});
      }) // вывод ошибки
    }
  }, [loggedIn])


  //функция удаления фильма со страницы с сохраненными фильмами
  function deleteMovie (movieId) {
    deleteMovieAPI(movieId)
      .then((res) => 
      {
        setSavedMovies(savedMovies.filter((item) => item._id !== movieId));
        setNameFilterSavedMovies(savedMovies.filter((item) => item._id !== movieId));
      })
      .catch((err) => {
        console.log('Ошибка удаления фильма'); //вывод ошибки
        setMessage({isOpen: true, textMessage: 'Ошибка удаления фильма'});
      })
  }

  //функция поиска среди сохраненных фильмов
  function findSavedMovie(searchString) {
    const moviesList = findNameMovie(savedMovies, searchString);
    setNameFilterSavedMovies(moviesList);
    if (checkShortSavedMovies) {
      setFoundSavedMovies(findShortMovies(moviesList));
    } else {
      setFoundSavedMovies(moviesList);
    }
  }

  //функция обратчик нажатия кнопки Найти на странице сохраненных фильмах
  function handleQuerySavedMovies (searchString) {
    setExecFindSavedMovies(true);
    findSavedMovie(searchString);
    //setExecFindSavedMovies(false);
  }

  //функция обработчик удаления фильма из сохраненных
  function handleDeleteSavedMovie (movie) {
    deleteMovie(movie._id);
  }

  //хук фильтрации фильмов по признаку короткометражки
  useEffect(() => {
    if (checkShortSavedMovies) {
      setExecFindSavedMovies(true);
      setFoundSavedMovies(findShortMovies(nameFilterSavedMovies));
    } else {
      setExecFindSavedMovies(true);
      setFoundSavedMovies(nameFilterSavedMovies)
    };
    return() => {
      setExecFindSavedMovies(false);
    }
  }, [checkShortSavedMovies]);

  useEffect(() => {
    setNameFilterSavedMovies(savedMovies);
  }, [execFindSavedMovies]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">     
        <div className='page'>
          <Routes>
            <Route path='/' element={<Header isLoggedIn={loggedIn} />} />
            <Route path='/profile' element={<Header isLoggedIn={loggedIn} />} />
            <Route path='/movies' element={<Header isLoggedIn={loggedIn} />} />
            <Route path='/saved-movies' element={<Header isLoggedIn={loggedIn} />} />
          </Routes>
          <Routes>
              <Route element={loggedIn ? <Navigate to='/' replace='true' /> :  <Navigate to='/signin' replace='true' />} />
              <Route path='/signin' element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
              <Route path='/signup' element={<Register handleRegister={handleRegister} loggedIn={loggedIn} />} />
              <Route path='/' element={<Main />} />
              <Route path='/profile' element={
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  handleUpdateUser={handleUpdateUser}
                  handleOut={signOut}
                />}
              />
              <Route path='/movies' element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  handleQueryMovies={handleQueryMovies}
                  handleSwitchShortMovie={switchShortMovie}
                  handleActionMovie={handleActionMovie}
                  checkShortMovie={checkShortMovie}
                  checkSavedMovies={checkSavedMovies}
                  movies={foundMovies}
                  isLoading={isLoading}
                  isErrorFind={errorFind}
                  isNotFound={notFound}
                  isExecFind={execFind}
                />}
              />
              <Route path='/saved-movies' element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  movies={foundSavedMovies}
                  savedMovies={savedMovies}
                  handleQuerySavedMovies={handleQuerySavedMovies}
                  handleDeleteSavedMovie={handleDeleteSavedMovie} 
                  switchShortSavedMovies={switchShortSavedMovies}
                  checkShortSavedMovies={checkShortSavedMovies}
                  execFindSavedMovies={execFindSavedMovies}
                  setExecFindSavedMovies={setExecFindSavedMovies}
                />}
              />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Routes>
            <Route path='/' element={<Footer />} />
            <Route path='/movies' element={<Footer />} />
            <Route path='/saved-movies' element={<Footer />} />
          </Routes>
          <PopupMessage msg={msg} setMessage={setMessage} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
