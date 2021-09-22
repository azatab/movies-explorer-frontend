import React from "react";
import './MoviesCard.css'

const MoviesCard = (props) => {
  const handleClick = () => {
    props.onSave(props.movie);
  }
  const movieDuration = Math.trunc(props.movie.duration / 60) + ' ч. ' + props.movie.duration % 60 + ' м.';

  
  return (
    <li className="movies-card" id={props.movie.id}>
      <h2 className="movies-card__title" >{props.movie.nameRU}</h2>
      <p className="movies-card__duration">{movieDuration}</p>
      <a 
        href={props.movie.trailerLink}
        className="movies-card__link"
        target="_blank"
        rel="noreferrer"
      >
        <img 
          className="movies-card__image"
          src={props.showSaved ? props.movie.image : `https://api.nomoreparties.co${props.movie.image.url}`}
          alt={props.movie.nameRU}
        />
      </a>
      <button 
        type="button"
        className={`movies-card__button 
          ${props.movie.saved && !props.showSaved ? 'movies-card__button_saved' : ''}  
          ${props.showSaved ? 'movies-card__button_unsave' : ''}`}
        onClick={handleClick} 
      />
    </li>
  );
}

export default MoviesCard;