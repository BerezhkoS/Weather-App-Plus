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

function showData(response) {
  //console.log(response);

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".current-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".feels-like-temp").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
}

function getApiData(event) {
  event.preventDefault();
  let city = document.querySelector(".city-search").value;
  let apiKey = "6782253072f7d90462731a624097fc54";
  let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlWeather).then(showData);
}

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", getApiData);

function showLocation(position) {
  let apiKey = "6782253072f7d90462731a624097fc54";
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrlLocation).then(showData);
}

function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
