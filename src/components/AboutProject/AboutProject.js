import React from 'react';
import './AboutProject.css'

const AboutProject = () => {
  return (
    <section className="about-project">
      <div className="about-project__info">
        <div className="about-project__bio">
          <h3 className="about-project__bio-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__bio-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__bio">
        <h3 className="about-project__bio-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__bio-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <p className="about-project__timeline-green">1 неделя</p>
        <p className="about-project__timeline-grey">4 недели</p>
        <p className="about-project__timeline-text">Back-end</p>
        <p className="about-project__timeline-text">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;