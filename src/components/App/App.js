import React from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [moviesSaved, setMoviesSaved] = React.useState([]);
  const [moviesFound, setMoviesFound] = React.useState([]);
  const [preloader, setPreloader] = React.useState(false);
  const [searchMovieError, setSearchMovieError] = React.useState(false);
  const [amountToDisplay, setAmountToDisplay] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) return 12; 
    else if (windowWidth > 767) return 8; 
    else return 5; 
  });
  const [amountToAdd, setAmountToAdd] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) return 3;
    else if (windowWidth > 767) return 2;
    else return 2;
  });

  React.useEffect(() => {
    window.addEventListener('resize', onScreenResize);
    return () => window.removeEventListener('resize', onScreenResize);
  }, ); 

  const onScreenResize = () => {
    const windowWidth = window.innerWidth;
    
    if (windowWidth > 1279) {
      setAmountToDisplay(12); 
      setAmountToAdd(3);
    } else if (windowWidth > 767) {
      setAmountToDisplay(8); 
      setAmountToAdd(2);
    } else  {
      setAmountToDisplay(5); 
      setAmountToAdd(2);
    }

    setMovies(moviesFound.slice(0, amountToDisplay));
  }

  const history = useHistory();
  const pathname = useLocation();

  const handleLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setToken("");
    history.push('/');
  }

  const handleProfileEdit = (name, email) => {
    MainApi.editProfile(token, name, email)
      .then(user => {
        if (user._id) {
          setCurrentUser(user);
          setErrorMsg("Данные профиля успешно изменены");
        }
        else if (user.message) setErrorMsg(user.message);
      })
      .catch(err => {
        if (err === 409) return setErrorMsg(`Пользователь с таким email уже существует.`)
        setErrorMsg("При обновлении профиля произошла ошибка.")
      });
  }

  React.useEffect(() => {
    setErrorMsg("");
    setSearchMovieError(false);
  }, [pathname]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([MainApi.getUserInfo(token), MainApi.getSavedMovies(token), MoviesApi.getMovies()])
        .then(([user, savedItems, items]) => {
          setCurrentUser(user);
          let newItems = [];
          savedItems.length > 0 ?
            savedItems.forEach(el => {
              newItems = items.map(i => (i.id === el.movieId ? Object.assign(i, { saved: true }) : i ))
            }) : newItems = items
                  
          localStorage.setItem('movies', JSON.stringify(newItems));
          localStorage.setItem('moviesSaved', JSON.stringify(savedItems));
          setMoviesSaved(savedItems);
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn, token])

  const handleLogin = (email, password) => {
    
    MainApi.login(email, password)
      .then(data => {
        setToken(data.token);
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch(err => {
        if (err === 400) return setErrorMsg("При авторизации произошла ошибка. Переданный токен некорректен.");
        if (err === 401) return setErrorMsg(`Вы ввели неправильный адрес почты или пароль.`);
        setErrorMsg("Попробуйте ещё раз!");
        console.log(`Ошибка - ${err}`);
      })
  }

  const handleRegister = (name, email, password) => {
    
    MainApi.register(name, email, password)
      .then(data => {
        if (data._id) handleLogin(email, password)
      })
      .catch(err => {
        setErrorMsg("При регистрации пользоваеля произошла ошибка");
        if (err === 400) return setErrorMsg("Проверьте корректность заполнения полей.")
        if (err === 409) return setErrorMsg(`Пользователь с таким email уже существует.`)
      }) 
  }
  const search = ({ setToSearch, text, shortFilms }) => {
    return setToSearch.filter(el => {
      return (el.nameRU.toLowerCase().indexOf(text.toLowerCase()) > -1) && (!shortFilms || (shortFilms && el.duration <= 40))
    });
  }
  
  const searchMovies = ({ text, saved, shortFilms}) => {
    setPreloader(true);
    setErrorMsg("");
    setMovies([]);
    setMoviesFound([]);
    
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    
    const setToSearch = saved ? localSavedMovies : localMovies
    const result = search({ setToSearch, text, shortFilms });
    
    result.length > 0 ? setSearchMovieError(false) : setSearchMovieError(true)

    saved ? setMoviesSaved(result) : setMoviesFound(result);
    
    setMovies(result.slice(0, amountToDisplay));    
    
    setTimeout(() => setPreloader(false), 500);
  }

  const handleMoreMovies = () => {
    setMovies(moviesFound.slice(0, movies.length + amountToAdd));
  }

  const addMovie = (movie) => {
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));

    const movieCopy = localMovies.filter(i => i.id === movie.id)[0];

    const {country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id} = movieCopy;

    const movieToAdd = {
      country: country || "---",
      director: director || "---",
      duration: duration || 0,
      year: year || "----",
      description: description || "----",
      image: `https://api.nomoreparties.co${image.url}`,
      trailer: trailerLink,
      thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
      nameRU: nameRU || "----",
      nameEN: nameEN || "----",
      movieId: id,
    };
    
    MainApi.addMovie(token, movieToAdd)
      .then(newMovie => {
        const newLocalSavedMovies = [...localSavedMovies, {
          nameRU: newMovie.nameRU,
          _id: newMovie._id,
          id: newMovie.movieId,
          movieId: newMovie.movieId,
          trailer: newMovie.trailer,
          duration: newMovie.duration,
          image: newMovie.image,
        }]

        localStorage.setItem('moviesSaved', JSON.stringify(newLocalSavedMovies));
        setMoviesSaved(newLocalSavedMovies);

        const newMovies = localMovies.map(movie => (movie.id === newMovie.movieId ? Object.assign(movie, { saved: true }) : movie ))
        setMovies(newMovies);
        localStorage.setItem('movies', JSON.stringify(newMovies));
      })
      .catch(() => setErrorMsg("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"))
  }

  const deleteMovie = (movie) => {
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    const id = movie._id;
    MainApi.deleteMovie({ token, id })
      .then(deletedMovie => {
        const newLocalSavedMovies = localSavedMovies.filter(movie => (movie.id !== deletedMovie.movieId));
        localStorage.setItem('moviesSaved', JSON.stringify(newLocalSavedMovies));
        //const newMoviesSaved = moviesSaved.filter(movie => (movie.id !== deletedMovie.movieId));
        //setMoviesSaved(newMoviesSaved);
        setMoviesSaved(newLocalSavedMovies);
        const newMovies = movies.map(movie => (movie.id === deletedMovie.movieId ? Object.assign(movie, { saved: false}) : movie ));
        setMovies(newMovies);
        localStorage.setItem('movies', JSON.stringify(newMovies));
      })
      .catch(() => setErrorMsg("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"))
  }

  const handleSave = (movie) => {
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    const savedMovie = localSavedMovies.filter(mov => mov.id === movie.id)[0];

    if (savedMovie) deleteMovie(movie);
    else addMovie(movie);
  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="App">
        <div className="App-container">
          <Route exact path="/(|movies|saved-movies|profile)">
            <Header loggedIn = {loggedIn} />
          </Route>
          
          <Switch>
            <ProtectedRoute exact path="/movies" loggedIn = {loggedIn}>
              <Movies 
                preloader = {preloader}
                handleSearch = {searchMovies}
                searchMovieError = {searchMovieError}
                errorMsg = {errorMsg}
                moviesToRender = {movies}
                moviesFound = {moviesFound}
                onSave = {handleSave}
                moreMovies = {handleMoreMovies}
              />
            </ProtectedRoute>

            <ProtectedRoute exact path="/saved-movies" loggedIn = {loggedIn}>
              <SavedMovies 
                preloader = {preloader}
                handleSearch = {searchMovies}
                searchMovieError = {searchMovieError}
                moviesToRender = {moviesSaved}
                onSave = {handleSave}
                errorMsg = {errorMsg}
              />
            </ProtectedRoute>

            <ProtectedRoute exact path="/profile" loggedIn = {loggedIn}>
              <Profile 
                handleLogOut = {handleLogOut}
                handleProfileEdit = {handleProfileEdit}
                errorMsg = {errorMsg}
                setErrorMsg = {setErrorMsg}
              />
            </ProtectedRoute>

            <Route path="/signin">
              <Login 
                handleLogin = {handleLogin}
                errorMsg = {errorMsg}
                setErrorMsg = {setErrorMsg}
              />
            </Route>

            <Route path="/signup">
              <Register 
                handleRegister = {handleRegister}
                errorMsg = {errorMsg}
                setErrorMsg = {setErrorMsg}
              />
            </Route>
            
            <Route exact path="/">
              <Main />
            </Route>

            <Route path="*">
              <NotFound linkBack="/" />
            </Route>
          </Switch>

          <Route exact path="/(|movies|saved-movies)">
            <Footer />
            </Route>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
