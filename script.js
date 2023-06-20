let now = new Date();

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weekDay = weekDays[now.getDay()];
let day = now.getDate(now);
let month = now.getMonth() + 1;
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${weekDay} ${day}.${month}.${year} ${hours}:${minutes} `;

let enterCityForm = document.querySelector("#search-city");
enterCityForm.addEventListener("submit", handleSubmit);

function showData(response) {
  let city = response.data.name;
  let cityHeading = document.querySelector("#city");
  cityHeading.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let todaysTemperatureElement = document.querySelector("#current-temperature");
  todaysTemperatureElement.innerHTML = `${temperature}°C`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;
}
function search(city) {
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
}

function showGeoData(response) {
  let city = response.data.name;
  let cityHeading = document.querySelector("#city");
  cityHeading.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let todaysTemperatureElement = document.querySelector("#current-temperature");
  todaysTemperatureElement.innerHTML = `${temperature}°C`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showGeoData);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

search("Berlin");
