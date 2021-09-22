import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const SavedMovies = (props) => {
  
  return (
    <main className="movies">
      <SearchForm 
        handleSearch = {props.handleSearch}
        showSaved = {true}
      />
      {props.preloader && <Preloader />}
      <MoviesCardList 
        showSaved
        moviesToRender = {props.moviesToRender}
        searchMovieError = {props.searchMovieError}
        errorMsg = {props.errorMsg}
        onSave = {props.onSave}
      />

    </main>
  );
}

export default SavedMovies;