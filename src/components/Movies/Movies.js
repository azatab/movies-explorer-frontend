import React from "react";
import './Movies.css'

import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from "../MoreButton/MoreButton";


const Movies = () => {
  const isLoading = false;
  
  return (
    <main className="movies">
      <SearchForm />
      {isLoading && <Preloader />}
      <MoviesCardList />
      <MoreButton>Ещё</MoreButton>
    </main>
  );
}

export default Movies;