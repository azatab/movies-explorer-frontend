import React from "react";
import './Movies.css'

import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from "../MoreButton/MoreButton";
// import { THREE_COLUMNS_WINDOW_WIDTH, TWO_COLUMNS_WINDOW_WIDTH } from '../../utils/config';

const Movies = (props) => {
  // let moviesList = [];

  // const [amountToDisplay, setAmountToDisplay] = React.useState(() => {
  //   const windowWidth = window.innerWidth;
  //   if (windowWidth > THREE_COLUMNS_WINDOW_WIDTH) return 3; 
  //   else if (windowWidth > TWO_COLUMNS_WINDOW_WIDTH) return 2; 
  //   else return 5; 
  // });

  // const [amountToAdd, setAmountToAdd] = React.useState(() => {
  //   const windowWidth = window.innerWidth;
  //   if (windowWidth > THREE_COLUMNS_WINDOW_WIDTH) return 3;
  //   else if (windowWidth > TWO_COLUMNS_WINDOW_WIDTH) return 2;
  //   else return 2;
  // });

  // const onScreenResize = () => {
  //   const windowWidth = window.innerWidth;
    
  //   if (windowWidth > THREE_COLUMNS_WINDOW_WIDTH) {
  //     setAmountToDisplay(3); 
  //     setAmountToAdd(3);
  //   } else if (windowWidth > TWO_COLUMNS_WINDOW_WIDTH) {
  //     setAmountToDisplay(2); 
  //     setAmountToAdd(2);
  //   } else {
  //     setAmountToDisplay(5); 
  //     setAmountToAdd(2);
  //   }
  // }

  // React.useEffect(() => {
  //   window.addEventListener('resize', onScreenResize);
  //   return () => window.removeEventListener('resize', onScreenResize);
  // }, []);

  // React.useEffect(() => {setAmountToDisplay(0)}, [setAmountToDisplay])
  
  // moviesList = props.moviesToRender.slice(0, amountToDisplay);

  // const handleMoreMovies = () => {
  //   setAmountToDisplay(prev => prev + amountToAdd);
  //   //moviesList = props.moviesToRender.slice(0, moviesList.length + amountToAdd);
  // }
  
  return (
    <main className="movies">
      <SearchForm 
        handleSearch = {props.handleSearch}
        renderShort = {props.renderShort}
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