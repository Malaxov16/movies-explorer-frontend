// Movies — компонент страницы с поиском по фильмам
import './SavedMovies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from 'react';


const SavedMovies = ({ foundMovies, savedMovies, handleQuerySavedMovies, handleDeleteSavedMovie, switchShortSavedMovies, checkShortSavedMovies, execFindSavedMovies, setExecFindSavedMovies, setCheckShorSavedMovies }) => {
  const [notFound, setNotFound] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);

  //проверка отфильтрованного массива на наличие фильмов
  useEffect(() => {
    if (foundMovies.length !== 0) {
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [foundMovies]);

  //хук сбрасывает стейт признака выполнения поиска, если страница прогружается не из-за выполнения поиска
  useEffect(() => {
    setExecFindSavedMovies(false);
  }, [])
  
  //хук сбрасывает стейт пустого массива, если страница прогружается не из-за выполнения поиска
  useEffect(() => {
    setNotFound(false);
  }, [])

  //при поступлении отфильтрованного массива или массива с сохраненными фильмами, проверяет в результате чего прогружается страница и в зависимости от причины формирует инициализирующий массив
 
  useEffect(() => {
    if(execFindSavedMovies) {
      setInitialMovies(foundMovies);
    } else {
      setInitialMovies(savedMovies);
    }
  },[foundMovies, savedMovies, execFindSavedMovies])



  return(
    <main className="saved-movies">
      <SearchForm handleSwitchShortMovie={switchShortSavedMovies} checkShortMovie={checkShortSavedMovies} handleQueryMovies={handleQuerySavedMovies} />
      {
        (execFindSavedMovies && notFound)
        ?
        <p className='saved-movies__msg'>Фильмы не найдены</p>
        :
        <MoviesCardList moviesArray={initialMovies} isMoviesPage={false} handleDeleteSavedMovie={handleDeleteSavedMovie} />
      }
    </main>
  )
}

export default SavedMovies;