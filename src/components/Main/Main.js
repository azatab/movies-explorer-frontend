import React from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Section from '../Section/Section';
import Portfolio from '../Portfolio/Portfolio';

import './Main.css';

const Main = () => {
  return (
    <main className="main">
      <Promo />
      
      <Section
        title="О проекте"
        id="AboutProject"
      >
        <AboutProject />
      </Section>
      
      <Section
        title="Технологии"
        id="Techs"
        theme="theme_light"
      >
        <Techs />
      </Section>
      
      <Section
        title="Студент"
        id="AboutMe"
      >
        <AboutMe />
        <Portfolio />
      </Section>
    </main>
  );
};

export default Main;
