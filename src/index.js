import "./style.css";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const infoWrapper = document.getElementById("info-wrapper");
const location = document.getElementById("info-location");
const day = document.getElementById("day-1");
const temp = document.getElementById("temp-1");
const condition = document.getElementById("condition-1");
const rain = document.getElementById("rain-1");
const wind = document.getElementById("wind-1");

function addInfoBox() {
  for (let i = 0; i < 7; i += 1) {
    const infoBox = document.createElement("div");
    const infoDay = document.createElement("div");
    const infoTemp = document.createElement("div");
    const infoCondition = document.createElement("div");
    const infoRain = document.createElement("div");
    const infoWind = document.createElement("div");

    infoBox.classList.add("info-box");
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

async function getWeather(input) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?key=LHYLQPPB3KWXWZBGLTXZZC7UT`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log("info", weatherData);
    console.log("day:", weatherData.days[0].datetime);
    console.log("temp:", weatherData.days[0].temp);
    console.log("condition:", weatherData.days[0].conditions);
    console.log("rain:", weatherData.days[0].precipprob);
    console.log("wind:", weatherData.days[0].windspeed);

    location.textContent = weatherData.resolvedAddress;

    day.textContent = weatherData.days[0].datetime;
    temp.textContent = `${weatherData.days[0].temp}F`;
    condition.textContent = weatherData.days[0].conditions;
    rain.textContent = `Precipitation: ${weatherData.days[0].precipprob}%`;
    wind.textContent = `${weatherData.days[0].windspeed} mph`;
  } catch (error) {
    console.log(error);
  }
}

searchButton.addEventListener("click", () => {
  console.log(searchInput.value);
  getWeather(searchInput.value);
});

window.addEventListener("load", (event) => {
  addInfoBox();
});
// add loop that does getWeather 7 times, one for each day of the week
// add DOM elements that input this data into the HTML

getWeather();
console.log("hello");
