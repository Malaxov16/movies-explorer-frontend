// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import MovieCard from "../MovieCard/MovieCard";

import './MoviesCardList.css';

const MoviesCardList = ({moviesArray, onCardClick, onCardSave, isMoviesPage}) => {
  let isSavedMovie = false;
  return(
    <section className="elements">
      {moviesArray.map((movie) => {
        if (movie) {isSavedMovie=true};
        return(
          <MovieCard key={movie.id} onCardClick={onCardClick} onCardSave={onCardSave} movieCard={movie} isMoviesPage={isMoviesPage} isSavedMovie={isSavedMovie}/>
        )
      })}
    </section>
  )
};

export default MoviesCardList;