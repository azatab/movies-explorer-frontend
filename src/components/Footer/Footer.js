import React from "react";
import './Footer.css'

const Footer = () => {
  const links = [
    {
      id: 1,
      name: 'Яндекс.Практикум',
      link: 'https://practicum.yandex.ru'
    },
    {
      id: 2,
      name: 'Github',
      link: 'https://github.com'
    },
    {
      id: 3,
      name: 'Facebook',
      link: 'https://facebook.com'
    }
  ];
  
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__columns">
        <div className="footer__column">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
        <div className="footer__column">
          <nav>
            <ul className="footer__column-links">
              {links.map((el) => (
                <li className="footer__column-item" key={el.id}>
                  <a 
                    href={el.link} 
                    className="footer__link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;