// Movies — компонент страницы с поиском по фильмам

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";

import './SavedMovies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";


const SavedMovies = ({ movies, handleDeleteSavedMovie }) => {

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  return(
    <main className="saved-movies">
      <SearchForm />
      
      {isLoading ? <Preloader /> : <MoviesCardList moviesArray={movies} isMoviesPage={false} handleDeleteSavedMovie={handleDeleteSavedMovie} /> }
    </main>
  )
}

export default SavedMovies;