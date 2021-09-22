import React from "react";
import './Movies.css'

import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from "../MoreButton/MoreButton";


const Movies = (props) => {
    
  return (
    <main className="movies">
      <SearchForm 
        handleSearch = {props.handleSearch}
      />
      {props.preloader && <Preloader />}
      <MoviesCardList 
        moviesToRender = {props.moviesToRender}
        searchMovieError = {props.searchMovieError}
        errorMsg = {props.errorMsg}
        onSave = {props.onSave}
      />
      {props.moviesFound.length > props.moviesToRender.length && <MoreButton onClick = {props.moreMovies}>Ещё</MoreButton>}
    </main>
  );
}

export default Movies;