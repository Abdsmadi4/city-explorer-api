const axios = require('axios');


async function handleWeather(req, res) {

  const { lat, lon } = req.query;

  // const cityArr = weatherData.find(value => value.city_name.toLowerCase() === searchQuery.toLowerCase());
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&include=minutely`;


  const cityArr = await axios.get(url);
  try {
    const cityData = cityArr.data.data.map(value => new Forecast(value));
    res.status(200).send(cityData);
  } catch (error) {
    res.status(500).send({ error: error.responce.data.error });
  }

}

class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}

module.exports = { handleWeather };
