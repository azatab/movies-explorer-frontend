import React from "react";
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <label className="checkbox" htmlFor="shortfilm">
      <input 
        type="checkbox"
        className="checkbox__input"
        id="shortfilm"
      />
      <span className="checkbox__text">Короткометражки</span>
    </label>
    
  );
}

export default FilterCheckbox;