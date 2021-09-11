import React from 'react';
import './Socials.css';

const Socials = () => {
  const studentsSocials = [
    {
      id: 1,
      name: 'Facebook',
      link: 'https://www.facebook.com/azat.abrarov.5/'
    },
    {
      id: 2,
      name: 'Github',
      link: 'https://github.com/azatab/'
    }
  ];
  return (
    <div className="socials">
      <ul className="socials__list">
        {studentsSocials.map((el) => (
            <li className="socials__list-item" key={el.id}>
              <a 
                href={el.link} 
                className="socials__link"
                target="_blank"
                rel="noreferrer"
              >
                {el.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Socials;