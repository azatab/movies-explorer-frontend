import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const SavedMovies = () => {
  const isLoading = true;
  return (
    <main className="movies">
      <SearchForm />
      {isLoading && <Preloader />}
      <MoviesCardList showSaved/>

    </main>
  );
}

export default SavedMovies;