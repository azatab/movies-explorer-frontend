const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

const handleResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка - ${res.status} - ${res.statusText}`);

export const getMovies = () => {
  return fetch(`${BASE_URL}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)
}