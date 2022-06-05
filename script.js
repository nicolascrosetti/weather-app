// Dom
const placeDiv = document.getElementById('place');
const temperatureDiv = document.getElementById('temperature');
const placeImage = document.getElementById('place-image');
const searchLocation = document.getElementById('search-location');
const inputLocation = document.getElementById('input-location');
const weatherDiv = document.getElementById('weather');
const celsiusButton = document.getElementById('to-celsius');
const farenheitButton = document.getElementById('to-farenheit');
const body = document.querySelector('body');

// Functions
const processedData = (weatherObject) => {
  const place = weatherObject.name;
  const temperature = weatherObject.main.temp;
  const iconId = weatherObject.weather[0].icon;
  return { place, temperature, iconId };
};

const useData = (data) => {
  placeDiv.textContent = data.place;
  temperatureDiv.textContent = data.temperature;
  placeImage.src = `http://openweathermap.org/img/wn/${data.iconId}@2x.png`;

  if (data.temperature > 22) {
    body.classList.remove('cold');
    body.classList.add('hot');
    body.classList.remove('warm');
  } else if (data.temperature > 15) {
    body.classList.remove('hot');
    body.classList.remove('cold');
    body.classList.add('warm');
  } else {
    body.classList.remove('hot');
    body.classList.add('cold');
    body.classList.remove('warm');
  }
};

const convertToCelsius = function (temperature) {
  const celsius = (temperature - 32) / 1.8;
  const result = Math.round(celsius * 10) / 10;
  return result;
};

const convertToFarenheit = function (temperature) {
  const farenheit = temperature * 1.8 + 32;
  const result = Math.round(farenheit * 10) / 10;
  return result;
};

const fetchWeather = (location) => {
  // Fetch
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=83fd2c701afee4edba56d989ac078e0f`,
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((response) => {
      //   console.log(response);
      const data = processedData(response);
      useData(data);
      celsiusButton.classList.add('selected');
      farenheitButton.classList.remove('selected');
      weatherDiv.style.display = 'flex';
    })
    .catch((err) => {
      // Error
      console.log(err);
      alert('Location not found');
    });
};

// Event Listeners
searchLocation.addEventListener('click', () => {
  fetchWeather(inputLocation.value);
});

inputLocation.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchWeather(inputLocation.value);
  }
});

celsiusButton.addEventListener('click', () => {
  celsiusButton.classList.add('selected');
  farenheitButton.classList.remove('selected');
  const tempInCelsius = convertToCelsius(temperatureDiv.textContent);
  temperatureDiv.textContent = tempInCelsius;
});

farenheitButton.addEventListener('click', () => {
  farenheitButton.classList.add('selected');
  celsiusButton.classList.remove('selected');
  const tempInFarenheit = convertToFarenheit(temperatureDiv.textContent);
  temperatureDiv.textContent = tempInFarenheit;
});

// Preloaded
// fetchWeather('london');
