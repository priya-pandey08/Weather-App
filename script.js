const form = document.getElementById('weather-form');
const apiKeyInput = document.getElementById('api-key');
const messageEl = document.getElementById('message');
const resultSection = document.getElementById('weather-result');
const locationNameEl = document.getElementById('location-name');
const descriptionEl = document.getElementById('weather-description');
const iconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const saveKeyButton = document.getElementById('save-key');

const STORAGE_KEY = 'weatherly_api_key';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function getStoredApiKey() {
  return localStorage.getItem(STORAGE_KEY) || '';
}

function saveApiKey(value) {
  localStorage.setItem(STORAGE_KEY, value);
}

function showMessage(text, type = 'info') {
  messageEl.textContent = text;
  messageEl.className = `message ${type === 'error' ? 'error' : type === 'success' ? 'success' : ''}`.trim();
}

function clearMessage() {
  messageEl.textContent = '';
  messageEl.className = 'message';
}

function showResult(data) {
  locationNameEl.textContent = `${data.name}, ${data.sys.country}`;
  descriptionEl.textContent = data.weather[0].description;
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconEl.alt = data.weather[0].description;
  temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windSpeedEl.textContent = `${Math.round(data.wind.speed)} m/s`;
  resultSection.classList.remove('hidden');
}

function hideResult() {
  resultSection.classList.add('hidden');
}

function validateInputs(city, country, apiKey) {
  if (!city || !country) {
    throw new Error('City and country are required.');
  }

  if (!apiKey) {
    throw new Error('OpenWeatherMap API key is required.');
  }
}

async function fetchWeather(city, country, apiKey) {
  const query = `${encodeURIComponent(city.trim())},${encodeURIComponent(country.trim())}`;
  const url = `${API_URL}?q=${query}&units=metric&appid=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your key and try again.');
    }
    if (response.status === 404) {
      throw new Error('Location not found. Check the city and country values.');
    }
    throw new Error('Unable to fetch weather. Please try again later.');
  }

  const data = await response.json();
  if (!data.weather || !data.main) {
    throw new Error('Unexpected response from weather service.');
  }
  return data;
}

function loadInitialApiKey() {
  const storedKey = getStoredApiKey();
  if (storedKey) {
    apiKeyInput.value = storedKey;
    showMessage('API key loaded from browser storage.', 'success');
  }
}

saveKeyButton.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    showMessage('Enter your API key before saving.', 'error');
    return;
  }

  saveApiKey(key);
  showMessage('API key saved to browser storage.', 'success');
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearMessage();
  hideResult();

  const city = form.city.value;
  const country = form.country.value;
  const apiKey = apiKeyInput.value.trim() || getStoredApiKey();

  try {
    validateInputs(city, country, apiKey);
    showMessage('Loading weather...', 'info');
    const weatherData = await fetchWeather(city, country, apiKey);
    showResult(weatherData);
    showMessage('Current weather updated.', 'success');
  } catch (error) {
    showMessage(error.message, 'error');
  }
});

loadInitialApiKey();
