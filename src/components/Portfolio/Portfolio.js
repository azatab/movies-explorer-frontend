import React from 'react';
import './Portfolio.css'
import arrow from '../../images/arrow.png'

const Portfolio = () => {
  const portfolioSites = [
    {
      id: 1,
      name: 'Статичный сайт',
      link: 'https://github.com/azatab/how-to-learn'
    },
    {
      id: 2,
      name: 'Адаптивный сайт',
      link: 'https://github.com/azatab/russian-travel'
    },
    {
      id: 3,
      name: 'Одностраничное приложение',
      link: 'https://github.com/azatab/react-mesto-api-full'
    }
  ];

  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        {portfolioSites.map((el) => (
          <li className="portfopio__list-item" key={el.id}>
            <a 
              href={el.link} 
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              {el.name}
              <img 
                src={arrow} 
                alt="стрелка" 
                className="portfolio__link-image"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Portfolio;