// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import MovieCard from "../MovieCard/MovieCard";

import './MoviesCardList.css';

const MoviesCardList = ({handleActionMovie, handleDeleteSavedMovie, checkSavedMovies, moviesArray, onCardClick, onCardSave, isMoviesPage}) => {
  return(
    <section className="elements">
      {moviesArray.map((movie) => {
        return(
          <MovieCard 
            key={isMoviesPage ? movie.id : movie._id}
            onCardClick={onCardClick}
            handleActionMovie={handleActionMovie}
            handleDeleteSavedMovie={handleDeleteSavedMovie}
            checkSavedMovies={checkSavedMovies}
            onCardSave={onCardSave}
            movieCard={movie}
            isMoviesPage={isMoviesPage}/>
        )
      })}
    </section>
  )
};

export default MoviesCardList;