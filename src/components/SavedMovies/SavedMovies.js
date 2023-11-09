// Movies — компонент страницы с поиском по фильмам
import './SavedMovies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from 'react';


const SavedMovies = ({ movies, savedMovies, handleQuerySavedMovies, handleDeleteSavedMovie, switchShortSavedMovies, checkShortSavedMovies, execFindSavedMovies, setExecFindSavedMovies }) => {
  const [notFound, setNotFound] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);

  //проверка отфильтрованного массива на наличие фильмов
  useEffect(() => {
    if (movies.length !== 0) {
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [movies]);

  //хук сбрасывает стейт признака выполнения поиска, если страница прогружается не из-за выполнения поиска
  useEffect(() => {
    setExecFindSavedMovies(false);
  }, [])
  
  //хук сбрасывает стейт пустого массива, если страница прогружается не из-за выполнения поиска
  useEffect(() => {
    setNotFound(false);
  }, [])

  //при поступлении отфильтрованного массива или массива с сохраненными фильмами, проверяет в результате чего прогружается страница,
 
  useEffect(() => {
    if(execFindSavedMovies) {
      setInitialMovies(movies);
    } else {
      setInitialMovies(savedMovies);
    }
  },[movies, savedMovies, execFindSavedMovies])



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