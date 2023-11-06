// Movies — компонент страницы с поиском по фильмам

import { useState, useEffect, Component } from "react"

import './Movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Preloader from "../Preloader/Preloader";
import {useResize} from '../../hooks/useResize';
import {
  INITIAL_CARDS_1280,
  INITIAL_CARDS_1150,
  INITIAL_CARDS_650,
  ADD_CARDS_1280,
  ADD_CARDS_1150,
  ADD_CARDS_650
} from '../../utils/consts';


const Movies = ({ handleQueryMovies, handleSwitchShortMovie, checkShortMovie, movies, isLoading, isError, isNotFound, isExecFind }) => {
  const windowSize = useResize(); //хук, который возвращает объект с параметрами размера окна
  const [initialCards, setInitialCards] = useState(0); // стейт со значением количества карточке в инициализрующем массиве
  const [addCards, setAddCards] = useState(0); //стейт с количеством карточек, которые добавляются после нажатия на кнопку "Еще"
  const [initialMovies, setInitialMovies] =useState([]); //стейт инициализирующий массив
  const [isEndMovies, setIsEndMovies] = useState(false); //стейт конца основного массива mmovies

  //хук устанавливает значение инициализирующего массива и количество добавляемых карточек в зависимости от размера окна
  useEffect(() => {
    if (windowSize.isScreenXL) {
      setInitialCards(INITIAL_CARDS_1280);
      setAddCards(ADD_CARDS_1280);
    } else if (windowSize.isScreenL) {
      setInitialCards(INITIAL_CARDS_1280);
      setAddCards(ADD_CARDS_1280);
    } else if (windowSize.isScreenM) {
      setInitialCards(INITIAL_CARDS_1150);
      setAddCards(ADD_CARDS_1150);
    } else {
      setInitialCards(INITIAL_CARDS_650);
      setAddCards(ADD_CARDS_650);
    };
  }, [windowSize.width, movies])

  //функция увеличения значения инициализирующего массива
  function handleMoreButton () {
    setInitialCards(initialCards + addCards);
  }

  //хук формирует инициализирующий массив и устанавливает стейт конца основного массива
  useEffect(() => {
    setInitialMovies(movies.slice(0, initialCards))
    if (initialCards >= movies.length) {
      setIsEndMovies(true);
    } else {
      setIsEndMovies(false);
    }
  }, [initialCards])

  return(
    <main className="movies">
      <SearchForm handleQueryMovies={handleQueryMovies} handleSwitchShortMovie={handleSwitchShortMovie} checkShortMovie={checkShortMovie} />
      {isLoading 
      ? 
        <Preloader /> 
      : 
        isError 
        ?
        <p className="movies__msg">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>
        :
          (isNotFound && isExecFind)
          ?
          <p className="movies__msg">Фильмы не найдены</p>
          :
          <MoviesCardList moviesArray={initialMovies} isMoviesPage={true}/> }
          {/* скрываем кнопку если основной массив пустой или достигнут конец осонввного массива */}
      {(isNotFound || isEndMovies) ? '' : <MoreButton handleMoreButton={handleMoreButton} /> } 
    </main>
  )
}

export default Movies;