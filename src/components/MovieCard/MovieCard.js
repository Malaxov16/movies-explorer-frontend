// MoviesCard — компонент одной карточки фильма

import { mockComponent } from 'react-dom/test-utils';
import { urlMovies } from '../../utils/consts'
import './MovieCard.css';
import convertDuration from '../../utils/utils.js'

const MovieCard = ({movieCard, onCardClick, onCardSave, isMoviesPage, isSavedMovie, onSaveHandler, onDeleteHendler}) => {
  const isSaved = true;

  function handleCardCLick() {
    onCardClick(movieCard);
  }

  function handleCardSave() {
    onCardSave(movieCard);
  }

  return (
    <article className="card">
      <img className="card__image" src={urlMovies + movieCard.image.url} alt={movieCard.nameRU} onClick={handleCardCLick} />
      <div className="card__about">
        <p className="card__name">{movieCard.nameRU}</p>
        {isSavedMovie ?
            (isMoviesPage ?
               <button className='card__button card__button_saved' onClick={onDeleteHendler} type="button" />
               :
               <button className='card__button card__button_delete' onClick={onDeleteHendler} type='button' />)
            :
            <button className='card__button' onClick={onSaveHandler} type='button' />}
      </div>
      <p className="card__duration">{convertDuration(movieCard.duration)}</p>
    </article>
  )
};

export default MovieCard;