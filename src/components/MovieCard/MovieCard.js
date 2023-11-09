// MoviesCard — компонент одной карточки фильма

import { urlMovies } from '../../utils/consts'
import './MovieCard.css';
import convertDuration from '../../utils/utils.js'
import { Link } from 'react-router-dom';

const MovieCard = ({movieCard, handleActionMovie, handleDeleteSavedMovie, checkSavedMovies, onCardClick, onCardSave, isMoviesPage, isSavedMovie, onSaveHandler, onDeleteHendler}) => {

  function handleActionCLick() {
    handleActionMovie(movieCard);
  }

  return (
    <article className="card">
      <a href={movieCard.trailerLink} target='_blank' rel='noreferrer' className='card__trailer-link'>
        <img className="card__image" src={isMoviesPage ? urlMovies + movieCard.image.url : movieCard.image} alt={movieCard.nameRU} />
      </a>
      <div className="card__about">
        <p className="card__name">{movieCard.nameRU}</p>
        {
          isMoviesPage ?
            (checkSavedMovies(movieCard) ?
              <button className='card__button card__button_saved' onClick={handleActionCLick} type="button" />
              :
              <button className='card__button' onClick={handleActionCLick} type='button' />
            )
            :
            <button className='card__button card__button_delete' onClick={() => {handleDeleteSavedMovie(movieCard)}} type='button' />
        }
      </div>
      <p className="card__duration">{convertDuration(movieCard.duration)}</p>
    </article>
  )
};

export default MovieCard;