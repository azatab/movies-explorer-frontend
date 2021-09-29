import React from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import { THREE_COLUMNS_WINDOW_WIDTH, TWO_COLUMNS_WINDOW_WIDTH, SHORT_MOVIE_DURATION } from '../../utils/config';
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
  const [moviesShort, setMoviesShort] = React.useState([]);
  const [moviesSavedShort, setMoviesSavedShort] = React.useState([]);
  const [showShortMovies, setShowShortMovies] = React.useState(false);
  const [preloader, setPreloader] = React.useState(false);
  const [searchMovieError, setSearchMovieError] = React.useState(false);
  const [amountToDisplay, setAmountToDisplay] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > THREE_COLUMNS_WINDOW_WIDTH) return 3; 
    else if (windowWidth > TWO_COLUMNS_WINDOW_WIDTH) return 2; 
    else return 5; 
  });

  const [amountToAdd, setAmountToAdd] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > THREE_COLUMNS_WINDOW_WIDTH) return 3;
    else if (windowWidth > TWO_COLUMNS_WINDOW_WIDTH) return 2;
    else return 2;
  });

  const history = useHistory();
  const pathname = useLocation();

  const checkToken = React.useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    const foundMovies = localStorage.getItem('moviesFound');
        
    const savedMovies = localStorage.getItem('moviesSaved');
    if (jwt) {
      setToken(jwt);
      if (foundMovies) setMovies(JSON.parse(foundMovies));
      if (savedMovies) setMoviesSaved(JSON.parse(savedMovies));
      
      history.push(pathname.pathname);
      MainApi.getUserInfo(jwt)
        .then(user => {
          setCurrentUser(user);
          setLoggedIn(true);
        })
        .catch(err => console.log(err))
    } 
  }, [history, pathname.pathname])

  React.useEffect(() => {checkToken()}, [checkToken])

  const onScreenResize = () => {
    const windowWidth = window.innerWidth;
    
    if (windowWidth > THREE_COLUMNS_WINDOW_WIDTH) {
      setAmountToDisplay(3); 
      setAmountToAdd(3);
    } else if (windowWidth > TWO_COLUMNS_WINDOW_WIDTH) {
      setAmountToDisplay(2); 
      setAmountToAdd(2);
    } else {
      setAmountToDisplay(5); 
      setAmountToAdd(2);
    }

    setMovies(moviesFound.slice(0, amountToDisplay));
  }

  React.useEffect(() => {
    window.addEventListener('resize', onScreenResize);
    return () => window.removeEventListener('resize', onScreenResize);
  }, );
  
  React.useEffect(() => checkToken(), [checkToken]);

  const handleLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setToken("");
    history.push('/');
    setMovies([]);
    setMoviesFound([]);
    setMoviesSaved([]);
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
          
          const newItems = items.map(i => Object.assign(i, { movieId: i.id }));
          let newItemsWithSaved = [];
          savedItems.length > 0 ?
            savedItems.forEach(el => {
              newItemsWithSaved = newItems.map(i => (i.id === el.movieId ? Object.assign(i, { saved: true }) : i ))
            }) : newItemsWithSaved = newItems
                  
          localStorage.setItem('movies', JSON.stringify(newItemsWithSaved));
          localStorage.setItem('moviesSaved', JSON.stringify(savedItems));
          localStorage.setItem('moviesFound', JSON.stringify([]));
          
          setMoviesSaved(savedItems);
        })
        .catch(err => console.log(`Promise error - ${err}`))
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
    console.log(`Text search - ${text}`);
    return setToSearch.filter(el => {
      //return ((text && el.nameRU.toLowerCase().indexOf(text.toLowerCase()) > -1) || !text) 
      return ((text && el.nameRU.toLowerCase().indexOf(text.toLowerCase()) > -1)) 
      && (!shortFilms || (shortFilms && el.duration <= SHORT_MOVIE_DURATION))
    });
  }
  
  const searchMovies = ({ text, saved, shortFilms}) => {
    text && setPreloader(true);
    setErrorMsg("");
    setMovies([]);
    setMoviesFound([]);
    
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    
    const setToSearch = saved ? localSavedMovies : localMovies
    const result = search({ setToSearch, text, shortFilms });
    
    console.log(result);
    result.length > 0 ? setSearchMovieError(false) : text && setSearchMovieError(true)

    if (saved) {
      setMoviesSaved(result);
    } else {
      setMoviesFound(result); 
      localStorage.setItem('moviesFound', JSON.stringify(result));
    }
    setMovies(result.slice(0, amountToDisplay));    
    
    setTimeout(() => setPreloader(false), 500);
  }

   const handleMoreMovies = () => {
     setMovies(moviesFound.slice(0, movies.length + amountToAdd));
   }

  const addMovie = (movie) => {
    setPreloader(true);
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    const localFoundMovies = JSON.parse(localStorage.getItem('moviesFound'));

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

        const newMovies = localMovies.map(movie => (movie.id === newMovie.movieId ? Object.assign(movie, { saved: true }, {_id: newMovie._id}) : movie ))
        const newMoviesFound = movies.map(movie => (movie.id === newMovie.movieId ? Object.assign(movie, { saved: true }, {_id: newMovie._id}) : movie ))
        const newLocalMoviesFound = localFoundMovies.map(movie => (movie.id === newMovie.movieId ? Object.assign(movie, { saved: true }, {_id: newMovie._id}) : movie ))
        setMovies(newMoviesFound);
        localStorage.setItem('movies', JSON.stringify(newMovies));
        localStorage.setItem('moviesFound', JSON.stringify(newLocalMoviesFound));
      })
      .catch(() => setErrorMsg("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"))
      .finally(() => setPreloader(false))
  }
  
  const deleteMovie = (movie) => {
    setPreloader(true);
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    const localFoundMovies = JSON.parse(localStorage.getItem('moviesFound'));
    const id = movie._id;
            
    MainApi.deleteMovie({ token, id })
      .then((deletedMovie) => {
        
        const newLocalSavedMovies = localSavedMovies.filter(mov => mov._id !== deletedMovie.message._id);
        localStorage.setItem('moviesSaved', JSON.stringify(newLocalSavedMovies));
        
        setMoviesSaved(newLocalSavedMovies);
                
        const newMovies = localMovies.map(movie => (movie.id === deletedMovie.message.movieId ? Object.assign(movie, { saved: false}) : movie ));
        const newMoviesFound = movies.map(movie => (movie.id === deletedMovie.message.movieId ? Object.assign(movie, { saved: false}) : movie ));
        const newLocalMoviesFound = localFoundMovies.map(movie => (movie.id === deletedMovie.message.movieId ? Object.assign(movie, { saved: false}) : movie ));
        setMovies(newMoviesFound);
        localStorage.setItem('movies', JSON.stringify(newMovies));
        localStorage.setItem('moviesFound', JSON.stringify(newLocalMoviesFound));
      })
      .catch((err) => {
        setErrorMsg("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
        console.log(err)
      })
      .finally(() => {
        setPreloader(false)
      })
  }

   React.useEffect(() => {
     if (pathname === '/saved-movies') setMoviesSaved(moviesSaved);
   }, [moviesSaved, pathname]);

  const handleSave = (movie) => {
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    const savedMovie = localSavedMovies.filter(mov => mov.movieId === movie.movieId)[0];

    savedMovie ? deleteMovie(savedMovie) : addMovie(movie) 
  }

  const filterShortFilms = (set) => {
    return set.filter(el => el.duration <= SHORT_MOVIE_DURATION);
  }

  const onRenderShort = ({ saved, shortFilms }) => {
    if (shortFilms) {
      setShowShortMovies(true)
      saved ? setMoviesSavedShort(filterShortFilms(moviesSaved)) : setMoviesShort(filterShortFilms(moviesFound))
    } else {
      setShowShortMovies(false)
      saved ? setMoviesSavedShort([]) : setMoviesShort([])
    }
  }

  React.useEffect(() => {}, [moviesSaved, movies])

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="App">
        <div className="App-container">
          
          {useRouteMatch(['/signin', '/signup']) ? null : <Header loggedIn = {loggedIn} />}
                    
          <Switch>
            <ProtectedRoute exact path="/movies" loggedIn = {loggedIn}>
              <Movies 
                preloader = {preloader}
                handleSearch = {searchMovies}
                searchMovieError = {searchMovieError}
                errorMsg = {errorMsg}
                moviesToRender = {showShortMovies ? moviesShort : movies}
                moviesFound = {moviesFound}
                onSave = {handleSave}
                moreMovies = {handleMoreMovies}
                renderShort = {onRenderShort}
              />
            </ProtectedRoute>

            <ProtectedRoute exact path="/saved-movies" loggedIn = {loggedIn}>
              <SavedMovies 
                preloader = {preloader}
                handleSearch = {searchMovies}
                searchMovieError = {searchMovieError}
                moviesToRender = {showShortMovies? moviesSavedShort : moviesSaved}
                onSave = {handleSave}
                errorMsg = {errorMsg}
                renderShort = {onRenderShort}
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
              <NotFound />
            </Route>
          </Switch>

          {useRouteMatch(['/signin', '/signup', '/profile']) ? null : <Footer />}
                              
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
