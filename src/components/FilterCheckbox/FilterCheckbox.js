import React from "react";
import './FilterCheckbox.css';

const FilterCheckbox = ({ onChange }) => {
  const handleChange = (e) => {
    const { checked } = e.target;
    onChange({ checked });
  }

  return (
    <label className="checkbox" htmlFor="shortfilm">
      <input 
        type="checkbox"
        className="checkbox__input"
        id="shortfilm"
        onChange={handleChange}
      />
      <span className="checkbox__text">Короткометражки</span>
    </label>
    
  );
}

export default FilterCheckbox;