// модуль содержит API для обращения к сервису с фильмами

import { urlMovies } from "./consts";

//функция проверки ответа от сервера
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status)
};

//функция вызывает метод fetch с параметрами
const request = (endPoint, options) => {
  return fetch(`${urlMovies}${endPoint}`, options).then(checkResponse)
};

const headers = {
  'content-type': 'application/json'
};

export const getMoviesMain =() => {
  console.log('Запрос фильмов')
  return request('/beatfilm-movies', {
    method: 'GET',
    headers: headers,
  })
};