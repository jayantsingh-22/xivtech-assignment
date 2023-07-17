document.getElementById('weatherForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const citiesInput = document.getElementById('cities').value;
  const cities = citiesInput.split(',');

  try {
    const response = await fetch('/getWeather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cities }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    displayWeather(data.weather);
  } catch (error) {
    console.error(error);
    displayError('Something went wrong');
  }
});

function displayWeather(weather) {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = '';

  for (const city in weather) {
    const cityWeather = document.createElement('p');
    cityWeather.textContent = `${city}: ${weather[city]}`;
    weatherResult.appendChild(cityWeather);
  }
}

function displayError(message) {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = `<p>Error: ${message}</p>`;
}
