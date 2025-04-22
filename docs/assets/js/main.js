const API_KEY = '7ca72a9c62b6f95e426b4d6518c1eb30'; // Ваш API-ключ OpenWeatherMap

// Список известных городов (с их ID)
const cities = [
  { id: 2643743, name: "London" },
  { id: 5128581, name: "New York" },
  { id: 2988507, name: "Paris" },
  { id: 1850147, name: "Tokyo" },
  { id: 1275339, name: "Mumbai" }
];

// Получение города и отображение погоды
document.getElementById('getCities').addEventListener('click', () => {
  const citiesList = document.getElementById('citiesList');
  citiesList.style.display = 'block';
  citiesList.innerHTML = '<option value="">Select City</option>'; // Очистить старые города

  // Заполнение списка городов
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city.id;
    option.textContent = city.name;
    citiesList.appendChild(option);
  });

  citiesList.addEventListener('change', (e) => {
    const cityId = e.target.value;
    if (cityId) {
      getWeather(cityId);
    }
  });
});

// Получение погоды по ID города
async function getWeather(cityId) {
  try {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}`);
    const weatherData = await weatherResponse.json();

    if (weatherData.cod !== 200) {
      throw new Error('Failed to fetch weather data');
    }

    const { name, weather, main, wind } = weatherData;
    const temperature = (main.temp - 273.15).toFixed(2); // Преобразование из Кельвинов в Цельсии
    const description = weather[0].description;
    const windSpeed = wind.speed;
    const humidity = main.humidity;

    // Обновление UI с данными о погоде
    document.getElementById('cityName').textContent = `City: ${name}`;
    document.getElementById('weatherDescription').textContent = `Weather: ${description}`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} m/s`;

    document.getElementById('weatherDetails').style.display = 'block';
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
