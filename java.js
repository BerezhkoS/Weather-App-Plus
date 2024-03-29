let dateTime = document.querySelector(".date-time");

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let now = new Date();
let weekDay = weekDays[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateTime.innerHTML = `${weekDay}, ${month} ${date}<br> ${hour}:${minutes}`;

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastDaily = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row forecast-row">`;

  forecastDaily.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col forecast-col">
    ${formatDayForecast(forecastDay.dt)}
    <br />
    <img src="icons/${forecastDay.weather[0].icon}.png" alt="${
          forecastDay.weather[0].description
        }" width="30" />
    <br />
    <strong>${Math.round(forecastDay.temp.max)}° </strong> ${Math.round(
          forecastDay.temp.min
        )}°
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecastApi(coordinates) {
  let apiKey = "6782253072f7d90462731a624097fc54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showData(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  celsiusTemperature = Math.round(response.data.main.temp);

  document.querySelector(".current-temperature").innerHTML = celsiusTemperature;

  document.querySelector(".current-weather").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".feels-like-temp").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;

  let icon = document.querySelector(".main-icon");
  icon.setAttribute("src", `icons/${response.data.weather[0].icon}.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");

  document.querySelector(".sign").innerHTML = "°C";

  getForecastApi(response.data.coord);
}

function getApiData(city) {
  let apiKey = "6782253072f7d90462731a624097fc54";
  let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlWeather).then(showData);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".city-search").value;

  getApiData(city);
}

function showLocation(position) {
  let apiKey = "6782253072f7d90462731a624097fc54";
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrlLocation).then(showData);
}

function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showFahrenheitTemperature(event) {
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  document.querySelector(".current-temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );

  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");

  document.querySelector(".sign").innerHTML = "°F";
}

function showCelsiusTemperature(event) {
  document.querySelector(".current-temperature").innerHTML = celsiusTemperature;

  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");

  document.querySelector(".sign").innerHTML = "°C";
}

let celsiusTemperature = null;

let fahrenheitButton = document.querySelector(".fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheitTemperature);

let celsiusButton = document.querySelector(".celsius");
celsiusButton.addEventListener("click", showCelsiusTemperature);

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

getApiData("Kyiv");
