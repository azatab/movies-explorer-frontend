import React from "react";
import './MoviesCard.css'

const MoviesCard = (props) => {
  const handleClick = (e) => {
    // props.onSave(e.target.parentElement.id);
    e.target.classList.toggle('movies-card__button_saved');
  }

  return (
    <li className="movies-card" id={props.movie.movieId}>
      <h2 className="movies-card__title" >{props.movie.nameRU}</h2>
      <p className="movies-card__duration">{props.movie.duration}</p>
      <a 
        href={props.movie.trailer}
        className="movies-card__link"
        target="_blank"
        rel="noreferrer"
      >
        <img 
          className="movies-card__image"
          src={props.movie.image}
          alt={props.movie.nameRU}
        />
      </a>
      <button 
        type="button"
        className={`movies-card__button 
          ${props.movie.isSaved && !props.showSaved ? 'movies-card__button_saved' : ''}  
          ${props.showSaved ? 'movies-card__button_unsave' : ''}`}
        onClick={handleClick} 
      />
    </li>
  );
}

export default MoviesCard;