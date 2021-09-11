import React from "react";
import './SearchForm.css';

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__search">
          <input 
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            required
            minLength="2"
            maxLength="40"
          />
          <button className="search-form__button" type="submit">
            Найти
          </button>
        </div>
        <FilterCheckbox />
      </form>
      <hr className="search-form__line" />
    </section>
  );
}

export default SearchForm;