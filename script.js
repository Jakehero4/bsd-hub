// script.js

// Google Search Function
document.getElementById('searchButton').addEventListener('click', function () {
  const query = document.getElementById('searchInput').value;
  if (query) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
});

// Weather Function
window.addEventListener('load', function () {
  const weatherElement = document.getElementById('weather');

  // Get current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Call OpenWeatherMap API
      const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const temperature = data.main.temp;
          const weatherDescription = data.weather[0].description;
          const city = data.name;
          
          // Display weather information
          weatherElement.innerHTML = `
            <p><strong>${city}</strong></p>
            <p>${weatherDescription}</p>
            <p>${temperature}°C</p>
          `;
        })
        .catch(error => {
          weatherElement.innerHTML = '<p>Unable to retrieve weather data.</p>';
        });
    });
  } else {
    weatherElement.innerHTML = '<p>Geolocation not supported by your browser.</p>';
  }
});
