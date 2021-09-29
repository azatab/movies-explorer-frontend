import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = (props) => {
  
  return (
    <>
      <span className={`${props.errorMsg.length > 0 ? "errorMsg" : ""}`}>{props.errorMsg}</span>
      <span className={`${props.searchMovieError ? "errorMsg" : ""}`}>{props.searchMovieError ? "Ничего не найдено" : ""}</span>
      <ul className="movies-cardlist">
        {props.moviesToRender.map((movie) => (
          <MoviesCard 
            movie={movie}
            key={movie.id ? movie.id : movie.movieId}
            showSaved={props.showSaved}
            onSave={props.onSave}

          />
        ))}
      </ul>
    </>
  );
}

export default MoviesCardList;