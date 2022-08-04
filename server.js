/* eslint-disable no-empty */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');



const app = express();
app.use(cors());
let PORT = process.env.PORT || 3001;

const weatherData = require('./data/weather.json');


//Routes
app.get('/weather', handleWeather);


//Functions
function handleWeather(req, res) {

  const { searchQuery, lat, lon } = req.query;

  let cityArr = weatherData.find(value => value.city_name.toLowerCase() === searchQuery.toLowerCase());

  try {
    const cityData = cityArr.data.map(value => new Forecast(value));
    res.status(200).send(cityData);
  } catch (error) {
    errorHandlre(error, res);
  }

}

app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});


function errorHandlre (error, res) {
  res.status(500).send({ error: error.responce.data.error });
}

class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.datetime;
  }
}



app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
