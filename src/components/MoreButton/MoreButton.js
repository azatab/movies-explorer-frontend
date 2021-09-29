import React from "react";
import './MoreButton.css'

const MoreButton = (props) => {
  return (
    <section className="more-button">
      <button type="button" className="more-button__btn" onClick={props.onClick}>
        {props.children}
      </button>
    </section>
  );
}

export default MoreButton;