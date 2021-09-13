import React from 'react';
import './App.css';
import { Route, Switch /*, useHistory*/ } from 'react-router-dom';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App = () => {
  const loggedIn =true;

  return (
    <div className="App">
      <div className="App-container">
        <Route exact path="/(|movies|saved-movies|profile)">
        <Header loggedIn = {loggedIn} />
        </Route>
        
        <Switch>
          <Route path="/movies">
            <Movies />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/signin">
            <Login />
          </Route>

          <Route path="/signup">
            <Register />
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
  );
}

export default App;
