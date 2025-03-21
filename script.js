async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const apiKey = '0a5ba2c4c913be707b0f79efa97cf5c9';  // You can get your own API key by signing up at https://openweathermap.org/api
    const resultBox = document.getElementById('weatherResult');
  
    if (!city) {
      resultBox.innerHTML = '<p>Please enter a city name.</p>';
      return;
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.cod === '404') {
        resultBox.innerHTML = `<p>City not found. Please try again.</p>`;
        return;
      }
  
      const { name } = data;
      const { temp } = data.main;
      const { main, description, icon } = data.weather[0];
  
      resultBox.innerHTML = `
        <h2>${name}</h2>
        <p>${main} - ${description}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" />
        <h3>${temp.toFixed(1)}°C</h3>
      `;
    } catch (error) {
      resultBox.innerHTML = `<p>Error fetching data. Try again later.</p>`;
      console.error(error);
    }
  }
  