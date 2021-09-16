import React from 'react';
import './Techs.css'

const Techs = () => {
  const techsArray = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB']
  return (
    <section className="techs">
      <h3 className="techs__title">
        7 технологий
      </h3>
      <p className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className="techs__list">
        {techsArray.map((el) => (
          <li className="techs__list-item" key={el}>
            {el}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Techs;