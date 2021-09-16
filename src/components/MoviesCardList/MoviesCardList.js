import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = (props) => {
  const movies = [
    {
      nameRU: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://images.unsplash.com/photo-1608460542677-5094083f9261?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
      movieId: "1",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: true
    },
    {
      nameRU: "В погоне за Бенкси2",
      duration: "37 минут",
      image: "https://images.unsplash.com/photo-1626637154206-d093b31ab171?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      movieId: "2",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: false
    },
    {
      nameRU: "В погоне за Счастьем",
      duration: "27 часов",
      image: "https://images.unsplash.com/photo-1552263354-65bc69113887?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=717&q=80",
      movieId: "3",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: true
    },
    {
      nameRU: "The Game",
      duration: "27 минут",
      image: "https://images.unsplash.com/photo-1551332772-a9a555f16780?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      movieId: "4",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: false
    },
    {
      nameRU: "Операция Ы и другие приключения Шурика",
      duration: "37 минут",
      image: "https://images.unsplash.com/photo-1595171694538-beb81da39d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=860&q=80",
      movieId: "5",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: true
    },
    {
      nameRU: "В погоне за Счастьем",
      duration: "27 часов",
      image: "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      movieId: "6",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: false
    },
    {
      nameRU: "В погоне за Счастьем",
      duration: "27 часов",
      image: "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      movieId: "7",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: false
    },
    {
      nameRU: "В погоне за Счастьем",
      duration: "27 часов",
      image: "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      movieId: "8",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: false
    },
    {
      nameRU: "Операция Ы и другие приключения Шурика",
      duration: "37 минут",
      image: "https://images.unsplash.com/photo-1595171694538-beb81da39d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=860&q=80",
      movieId: "9",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: true
    },
    {
      nameRU: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://images.unsplash.com/photo-1608460542677-5094083f9261?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
      movieId: "10",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: true
    },
    {
      nameRU: "В погоне за Бенкси2",
      duration: "37 минут",
      image: "https://images.unsplash.com/photo-1626637154206-d093b31ab171?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      movieId: "11",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: false
    },
    {
      nameRU: "В погоне за Счастьем",
      duration: "27 часов",
      image: "https://images.unsplash.com/photo-1552263354-65bc69113887?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=717&q=80",
      movieId: "12",
      trailer: "https://www.youtube.com/watch?v=0mzM8xCNXsI",
      isSaved: true
    },
  ];

  const onSave = (id) => {
   let a = movies.find(movie => movie.movieId === id).isSaved
   console.log(a);
  };

  const savedMovies = movies.filter(movie => movie.isSaved === true);
  
  const moviesToRender = props.showSaved ? savedMovies : movies;

  return (
    <ul className="movies-cardlist">
      {moviesToRender.map((movie) => (
        <MoviesCard 
          movie={movie}
          key={movie.movieId}
          showSaved={props.showSaved}
          onSave={onSave}

        />
      ))}
    </ul>
  );
}

export default MoviesCardList;