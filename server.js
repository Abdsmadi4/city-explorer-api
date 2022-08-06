/* eslint-disable no-empty */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const { handleWeather } = require('./module/weather');
const { handleMovies } = require('./module/movies');

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


app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
