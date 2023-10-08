// Movies — компонент страницы с поиском по фильмам

import { useState, useEffect } from "react"

import './Movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Preloader from "../Preloader/Preloader";



const Movies = ({ movies }) => {
  
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  // }, [])

  // const searchMovies = (movieConst) => {
  //   setMovies(movieConst)
  // }

  // useEffect(() => {
  //   searchMovies(movieConst);
  // }, [])

  return(
    <section className="movies">
      <SearchForm />
      {isLoading ? <Preloader /> : <MoviesCardList moviesArray={movies} isMoviesPage={true}/> }
      <MoreButton />
    </section>
  )
}

export default Movies;