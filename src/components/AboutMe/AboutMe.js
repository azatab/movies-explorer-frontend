import React from 'react';
import './AboutMe.css'
import photo from '../../images/my_foto.jpg';
import Socials from '../Socials/Socials';
const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-me__column">
        <h3 className="about-me__title">Азат</h3>
        <p className="about-me__subtitle">Фронтенд разрабочик, 37 лет</p>
        <p className="about-me__description">
        Я&nbsp;живу в&nbsp;Уфе, закончил факультет прикладной математики УГАТУ. У&nbsp;меня есть жена, дочь и&nbsp;сын. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь лыжами. Недавно начал кодить. С&nbsp;2008 года работал в&nbsp;ГБОУ РИЛИ. Нахожусь в&nbsp;поиске работы.
        </p>
        <Socials />
      </div>
      <img 
        className="about-me__photo" 
        src={photo}
        alt="Фотография студента" 
      />
    </section>
  );
}

export default AboutMe;