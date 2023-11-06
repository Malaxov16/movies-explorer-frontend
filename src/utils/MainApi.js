//MainApi - модуль содержит функции ля работы с внутренними API

import { urlBase, urlMovies } from "./consts";

const headers = {
  'content-type': 'application/json'
};

const getLocalToken = () => {
    return localStorage.getItem('token');
};

//функция проверки ответа от сервера
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status)
};

//функция вызывает метод fetch с параметрами
const request = (endPoint, options) => {
  return fetch(`${urlBase}${endPoint}`, options).then(checkResponse)
};

//функция регистрации пользователя
export const register = (name, email, password) => {
  return request('/signup', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    })
  })
};

//функция авторизации пользователя
export const login = (email, password) => {
  return request('/signin', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })
};

//функция обновления данных пользователя
export const updateUser = (name, email) => {
  const token = getLocalToken();
  return request('/users/me', {
    method: 'PATCH',
    headers: {
      'authorization': `Bearer ${token}`,
      ...headers
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
};

//функция получает данные об авторизованном пользователе
export const getUser = (token) => {
  return request('/users/me', {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${token}`,
      ...headers
    }
  })
};

//функция получения всех фильмов пользователя
export const getSavedMoviesAPI = () => {
  const token = getLocalToken();
  return request('/movies', {
    headers: {
      'authorization': `Bearer ${token}`,
      ...headers,
    }
  })
};

//функция сохранения фильма
export const saveMovieAPI = (movie) => {
  const token = getLocalToken();
  const currentMovie = {
    movieId: movie.id,
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: `${urlMovies}${movie.image.url}`,
    trailerLink: movie.trailerLink,
    thumbnail: `${urlMovies}${movie.image.formats.thumbnail.url}`,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  };
  return request('/movies', {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      ...headers,
    },
    body: JSON.stringify({...currentMovie})
  })
};

//функция удаления фильма
export const deleteMovieAPI = (movieID) => {
  const token = getLocalToken();
  return request(`/movies/${movieID}`, {
    method: 'DELETE',
    headers: {
      'authorization': `Bearer ${token}`,
      ...headers,
    },
  })
};