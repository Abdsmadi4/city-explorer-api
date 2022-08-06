/* eslint-disable no-empty */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(cors());
let PORT = process.env.PORT || 3001;

const weatherData = require('./data/weather.json');


//Routes , endpoints
app.get('/weather', handleWeather);

app.get('/movies', handleMovies);

app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});




//Functions
async function handleWeather(req, res) {

  const { searchQuery, lat, lon } = req.query;

  // const cityArr = weatherData.find(value => value.city_name.toLowerCase() === searchQuery.toLowerCase());
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&include=minutely`;


  const cityArr = await axios.get(url);
  try {
    const cityData = cityArr.data.data.map(value => new Forecast(value));
    res.status(200).send(cityData);
  } catch (error) {
    errorHandlre(error, res);
  }

}

async function handleMovies(req, res) {
  const { searchQuery } = req.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  const movieArr = await axios.get(url);

  try {
    const movieData = movieArr.data.results.map(item => new Movie(item));
    res.status(200).send(movieData);
  } catch (error) {
    errorHandlre(error, res);
  }

}


function errorHandlre(error, res) {
  res.status(500).send({ error: error.responce.data.error });
}

class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}



app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
