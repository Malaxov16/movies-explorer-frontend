// Movies — компонент страницы с поиском по фильмам

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";

import './SavedMovies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Preloader from "../Preloader/Preloader";


const SavedMovies = ({ movies }) => {

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  // useEffect(() => {
  //   setIsLoading(true);
  // }, [])

  // const searchMovies = (movieConst) => {
  //   setMovies(movieConst)
  // }

  // useEffect(() => {
  //   searchMovies(movieConst);
  // })

  return(
    <main className="saved-movies">
      <SearchForm />
      
      {isLoading ? <Preloader /> : <MoviesCardList moviesArray={movies} isMoviesPage={false} /> }
      <MoreButton />
    </main>
  )
}

export default SavedMovies;