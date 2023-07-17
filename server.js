const express = require('express');
const axios = require('axios');
const path = require('path');


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const apiKey = '537034601af872940aafca41d54b40a6';

// Function to fetch weather data from the OpenWeatherMap API
async function fetchWeather(city) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const { temp } = response.data.main;
    return `${temp}C`;
  } catch (error) {
    console.error(`Failed to fetch weather for ${city}`, error);
    return null;
  }
}

// POST endpoint to get weather for multiple cities
app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = {};

    for (const city of cities) {
      const weather = await fetchWeather(city);
      weatherData[city] = weather;
    }

    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Error occurred while getting weather', error);
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
