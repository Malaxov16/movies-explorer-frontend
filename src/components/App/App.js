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
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//import moviesList from '../../utils/consts';

import { CurrentUserContext } from '../../constexts/currentUserContext';
import { getUser, login, register, updateUser } from '../../utils/MainApi';
import { getMoviesMain } from '../../utils/MoviesApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); //стейт состояния авторизации
  const [currentUser, setCurrentUser] = useState({}) //стейт с данными авторизованного пользователя


  const [allMovies, setAllMovies] = useState([]); //стейт со всеми фильмами от внешнего сервиса
  const [nameFilterMovies, setNameFilterMovies] = useState([]); //стейт с массивом фильмов отфильтрованных строке запроса
  const [foundMovies, setFoundMovies] = useState([]); //стейт с массивом фильмов отфильтрованных по строке запроса и признаку короткометражный
  const [checkShortMovie, setCheckShortMovie] = useState(false); //стейт переключателя короткометражек
  const [isLoading, setIsLoading] = useState(false); //стейт для отображения прелоадера во время поиска
  const [errorFind, setErrorFind] = useState(false); //стейт ошибки поиска
  const [notFound, setNotFound] = useState(false);
  const [execFind, setExecFind] = useState(false);
  

  const navigate = useNavigate();

  // ------------------------------------------- Функции для работы с пользователем---------------------------

  //устанавливает стейт в true, если пользователь авторизован
  function setLogin() {
    setLoggedIn(true);
  };

  //функция авторизации
  function handleLogin(email, password) {
    login(email, password)
      .then((res) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          setLogin();
          navigate('/', {replace: true})
          getUser(res.token)
            .then((res) => setCurrentUser(res.data))
            .catch((err) => console.log('Ошибка получения данных пользователя.')) //вывод ошибки
        } else {
          console.log('Ошибка получения токена.') //вывод ошибки
        }
      })
      .catch((res) => {
        console.log(res); //вывод ошибки
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
        };
      })
      .catch((err) => {
        console.log(`Ошибка регистрации: ${err}`); //вывод ошибки
      })
  };

  //функция обновления профиля
  function handleUpdateUser(name, email) {
    updateUser(name, email)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log('Ошибка обновления данных пользователя') //вывод ошибки
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

  //проверка авторизации пользователя при запуске приложения
  useEffect(() => {
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      getUser(token)
        .then((res) => {
          setLogin();
          navigate('/', {replace: true});
          setCurrentUser(res.data);
        })
        .catch((err) => {console.log(err)}) //вывод ошибки
    }
  }, []);


  //------------------------------------функции для работы с поиском фильмов---------------------------------------------

  //функция переключает стейт чекбокса короткометражек
  function switchShortMovie() {
    setCheckShortMovie(!checkShortMovie);
  };

  //функция фильтрации по тексту строки поиска
  function findNameMovie(movies, searchString) {
    console.log( 'Вызов функции findNameMovie ')
    console.log(movies)
    return movies.filter((movie) =>  
    { 
      return movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchString.toLowerCase());
    });
  };

  //функция фильтрации по признаку короткометражный
  function findShortMovies(movies) {
    return movies.filter((movie) => { return movie.duration <= 40 })
  };

  //функция поиска фильма в массиве по поисковой строке и признаку короткометражный, возвращает массив
  function findMovie(movies, searchString, isCheckShort) {
    console.log('Вызов функции findMovie ')
    console.log(movies)
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

  //проверка на пустой массив
  function checkNotFound (movies) {
    if (movies.length !== 0) {
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }

  //функция поиска короткометражных фильмов при изменении чекбокса в уже имеющемся массиве
  // function handleSwitchShortMovies () {
  //   console.log(checkShortMovie);
  //   setCheckShortMovie(!checkShortMovie);
  //   console.log(checkShortMovie);
  //   checkNotFound(nameFilterMovies);
  //   if (checkShortMovie && nameFilterMovies.length !==0) {
  //     const moviesList = findShortMovies(nameFilterMovies);
  //     checkNotFound(moviesList);
  //     setFoundMovies(moviesList);
  //   } else {
  //     setFoundMovies(nameFilterMovies);
  //   }
  //   localStorage.setItem('checkShortMovie', checkShortMovie);
  // }

  //функция обработчик кнопки "Найти" на форме поиска
  function handleQueryMovies (searchString) {
    setIsLoading(true);
    getMoviesMain()
      .then((res) => {
        console.log('Фильмы получены')
        console.log(res);
        setAllMovies(res);
        const movieList = findMovie(res, searchString, checkShortMovie);
        console.log('Результат поиска: ')
        console.log(movieList)
        checkNotFound(movieList);
        setFoundMovies(movieList);
        setExecFind(true);
      })
      .catch((err) => setErrorFind(true)) //вывод ошибки
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (localStorage.getItem('foundMovies')) {
      setExecFind(true);
      const movieList = JSON.parse(localStorage.getItem('foundMovies'));
      setNameFilterMovies(movieList);
      if (localStorage.getItem('checkShortMovie') === 'true') {
        setCheckShortMovie(true);
        setFoundMovies(findShortMovies(movieList));
        console.log('Ветка true')
      } else {
        console.log(movieList);
        setCheckShortMovie(false);
        setFoundMovies(movieList);
        console.log('Ветка false')
      }
    }
    //setCheckShortMovie(Boolean(localStorage.getItem('checkShortMovie')));
  },[])

useEffect(() => {
  console.log(nameFilterMovies)
  checkNotFound(nameFilterMovies);
  if (checkShortMovie) {
    const moviesList = findShortMovies(nameFilterMovies);
    checkNotFound(moviesList);
    setFoundMovies(moviesList);
  } else {
    setFoundMovies(nameFilterMovies);
  }
}, [checkShortMovie, nameFilterMovies]);




  function handleCardCLick () {
    console.log('Клик по карточке');
  };

  function handleCardSave() {
    console.log('Добавить карточку в сохраненные фильмы.');
  }

  function handleCardDelete() {
    console.log('Карточка удалена из сохраненных');
  }

  // useEffect(() => {
  //   setMovies(moviesList)
  // }, [])

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
              <Route element={loggedIn ? <Navigate to='/' replace='true' /> : <Navigate to='/signin' replace='true' />} />
              <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
              <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
              <Route path='/' element={<Main isLoggedIn={loggedIn} />} />
              <Route path='/profile' element={<Profile handleUpdateUser={handleUpdateUser} handleOut={signOut} />} />
              <Route path='/movies' element={<Movies handleQueryMovies={handleQueryMovies} handleSwitchShortMovie={switchShortMovie} checkShortMovie={checkShortMovie} movies={foundMovies} isLoading={isLoading} isErrorFind={errorFind} isNotFound={notFound} isExecFind={execFind} />} />
              <Route path='/saved-movies' element={<SavedMovies movies={allMovies}/>} />
              <Route path='*' element={ <PageNotFound />} />
          </Routes>
          <Routes>
            <Route path='/' element={<Footer />} />
            <Route path='/movies' element={<Footer />} />
            <Route path='/saved-movies' element={<Footer />} />
          </Routes>
                
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
