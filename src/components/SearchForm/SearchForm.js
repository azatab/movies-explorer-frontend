import React from "react";
import './SearchForm.css';

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = (props) => {
  const [text, setText] = React.useState("");
  const [shortFilms, setShortFilms] = React.useState(false);
  const [validForm, setValidForm] = React.useState(true);
  const saved = props.showSaved ? true : false;

  const handleInputChange = (e) => {
    setText(e.target.value);
    setValidForm(e.target.checkValidity());
  }

  const handleSearchClick = (e) => {
    e.preventDefault();
    props.handleSearch({ text, saved, shortFilms });
  }

  const handleShortFilmsClick = ({ checked }) => {
    setShortFilms(checked);
    //props.renderShort({ shortFilms, saved });
    props.handleSearch({ text, saved, shortFilms : checked });
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit = {handleSearchClick}>
        <div className="search-form__search">
          <input 
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            required
            minLength="2"
            maxLength="40"
            size="1"
            onChange={handleInputChange}
          />
          <button className="search-form__button" type="submit" disabled={!validForm}>
            Найти
          </button>
        </div>
        <FilterCheckbox 
          onChange={handleShortFilmsClick}
        />
      </form>
      <hr className="search-form__line" />
    </section>
  );
}

export default SearchForm;