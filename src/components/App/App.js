import React from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as MainApi from '../../utils/MainApi';
// import * as MoviesApi from '../../utils/MoviesApi';

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

  const history = useHistory();
  const pathname = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/');
  }

  const handleProfileEdit = (name, email) => {
    MainApi.profileEdit(token, name, email)
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
  }, [pathname]);

  const handleLogin = (email, password) => {
    console.log(`At appLogin - ${email} - ${password}`);
    MainApi.login(email, password)
      .then(data => {
        setToken(data.token);
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        history.push('/movies');
        console.log(token)
        MainApi.checkToken(data.token)
          .then(user => setCurrentUser(user))
          .catch(err => console.log(err))
      })
      .catch(err => {
        if (err === 400) return setErrorMsg("При авторизации произошла ошибка. Переданный токен некорректен.");
        if (err === 401) return setErrorMsg(`Вы ввели неправильный адрес почты или пароль.`);
        setErrorMsg("Попробуйте ещё раз!");
        console.log(`Ошибка - ${err}`);
      })
  }

  const handleRegister = (name, email, password) => {
    console.log(`At appReg - ${name} - ${email} - ${password}`);
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

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="App">
        <div className="App-container">
          <Route exact path="/(|movies|saved-movies|profile)">
            <Header loggedIn = {loggedIn} />
          </Route>
          
          <Switch>
            <ProtectedRoute exact path="/movies" loggedIn = {loggedIn}>
              <Movies />
            </ProtectedRoute>

            <ProtectedRoute exact path="/saved-movies" loggedIn = {loggedIn}>
              <SavedMovies />
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
