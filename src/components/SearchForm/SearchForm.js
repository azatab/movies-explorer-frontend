import React from "react";
import './SearchForm.css';

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = (props) => {
  const [text, setText] = React.useState("");
  const [shortFilms, setShortFilms] = React.useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
  }

  const handleSearchClick = (e) => {
    e.preventDefault();
    const saved = props.showSaved ? true : false;
    props.handleSearch({ text, saved, shortFilms });
  }

  const handleShortFilmsClick = ({ checked }) => {
    setShortFilms(checked);
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
          <button className="search-form__button" type="submit">
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