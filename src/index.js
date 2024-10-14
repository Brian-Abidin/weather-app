import "./style.css";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const infoWrapper = document.getElementById("info-wrapper");
const location = document.getElementById("info-location");
const responseTime = document.getElementById("response-time");
const toggleButton = document.getElementById("toggle-button");

function addInfoBox() {
  for (let i = 0; i < 7; i += 1) {
    const infoBox = document.createElement("div");
    const infoDay = document.createElement("div");
    const infoTemp = document.createElement("div");
    const infoCondition = document.createElement("div");
    const infoRain = document.createElement("div");
    const infoWind = document.createElement("div");

    infoBox.classList.add("info-box");
    infoDay.classList.add("day");
    infoTemp.classList.add("temp");
    infoCondition.classList.add("condition");
    infoRain.classList.add("rain");
    infoWind.classList.add("wind");

    infoBox.setAttribute("id", `box-${i + 1}`);
    infoDay.setAttribute("id", `day-${i + 1}`);
    infoTemp.setAttribute("id", `temp-${i + 1}`);
    infoCondition.setAttribute("id", `condition-${i + 1}`);
    infoRain.setAttribute("id", `rain-${i + 1}`);
    infoWind.setAttribute("id", `wind-${i + 1}`);

    infoBox.appendChild(infoDay);
    infoBox.appendChild(infoTemp);
    infoBox.appendChild(infoCondition);
    infoBox.appendChild(infoRain);
    infoBox.appendChild(infoWind);

    infoWrapper.appendChild(infoBox);
  }
}

function fahrenheitToCelsius(fahrenheit) {
  const celsius = ((fahrenheit - 32) * (5 / 9)).toFixed(1);
  return celsius;
}

function CelsiusToFahrenheit(celsius) {
  const fahrenheit = (celsius * (9 / 5) + 32).toFixed(1);
  return fahrenheit;
}

function changeUnits() {
  const regex = /\d+[.]\d+|\d/gm;

  if (toggleButton.textContent === "Imperial") {
    toggleButton.textContent = "Metric";
    for (let i = 0; i < 7; i += 1) {
      const temp = document.getElementById(`temp-${i + 1}`);
      const wind = document.getElementById(`wind-${i + 1}`);
      let metricTemp = 0;

      if (temp.textContent.includes("-")) {
        metricTemp = fahrenheitToCelsius(
          Number(temp.textContent.match(regex).join("")) * -1
        );
      } else {
        metricTemp = fahrenheitToCelsius(
          Number(temp.textContent.match(regex).join(""))
        );
      }

      const metricWind = (
        Number(wind.textContent.match(regex).join("")) * 1.60934
      ).toFixed(1);

      temp.textContent = `${metricTemp} °C`;
      wind.textContent = `Wind: ${metricWind} kph`;
    }
  } else {
    toggleButton.textContent = "Imperial";
    for (let i = 0; i < 7; i += 1) {
      const temp = document.getElementById(`temp-${i + 1}`);
      const wind = document.getElementById(`wind-${i + 1}`);
      let metricTemp = 0;

      if (temp.textContent.includes("-")) {
        metricTemp = CelsiusToFahrenheit(
          Number(temp.textContent.match(regex).join("")) * -1
        );
      } else {
        metricTemp = CelsiusToFahrenheit(
          Number(temp.textContent.match(regex).join(""))
        );
      }

      const metricWind = (
        Number(wind.textContent.match(regex).join("")) / 1.60934
      ).toFixed(1);

      temp.textContent = `${metricTemp} °F`;
      wind.textContent = `Wind: ${metricWind} mph`;
    }
  }
}

function epochToDay(time) {
  const dayName = new Date(time * 1000);
  return dayName.toString().slice(0, 10);
}

function inputWeatherData(weatherData, response) {
  location.textContent = weatherData.resolvedAddress;
  responseTime.textContent = `response: ${response} ms`;

  for (let i = 0; i < 7; i += 1) {
    const day = document.getElementById(`day-${i + 1}`);
    const temp = document.getElementById(`temp-${i + 1}`);
    const condition = document.getElementById(`condition-${i + 1}`);
    const rain = document.getElementById(`rain-${i + 1}`);
    const wind = document.getElementById(`wind-${i + 1}`);

    day.textContent = epochToDay(weatherData.days[i].datetimeEpoch);
    temp.textContent = `${weatherData.days[i].temp} °F`;
    condition.textContent = weatherData.days[i].conditions;
    rain.textContent = `Precipitation: ${weatherData.days[i].precipprob}%`;
    wind.textContent = `Wind: ${weatherData.days[i].windspeed} mph`;
  }
}

async function getWeather(input) {
  try {
    const start = performance.now();
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?key=LHYLQPPB3KWXWZBGLTXZZC7UT`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    const end = performance.now();
    const timeInSeconds = (end - start).toFixed(0);
    inputWeatherData(weatherData, timeInSeconds);
  } catch (error) {
    console.log(error);
  }
}

searchInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    searchButton.click();
  }
});

searchButton.addEventListener("click", () => {
  toggleButton.textContent = "Imperial";
  getWeather(searchInput.value);
});

window.addEventListener("load", (event) => {
  addInfoBox();
});

toggleButton.addEventListener("click", () => {
  changeUnits();
});
// add loop that does getWeather 7 times, one for each day of the week
// add DOM elements that input this data into the HTML

getWeather();
console.log("hello");
