import React from 'react';
import './Section.css';

const Section = (props) => {
  return (
    <section className={`section ${props.theme ? `section_${props.theme}` : ''}`} id={props.id}>
      <h2 className="section__title">{props.title}</h2>
      {props.children}
    </section>
  );
}

export default Section;