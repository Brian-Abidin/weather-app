import "./style.css";

const day = document.getElementById("day-1");
const temp = document.getElementById("temp-1");
const condition = document.getElementById("condition-1");
const rain = document.getElementById("rain-1");
const wind = document.getElementById("wind-1");

async function getWeather() {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=LHYLQPPB3KWXWZBGLTXZZC7UT",
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log("info", weatherData);
    console.log("day:", weatherData.days[0].datetime);
    console.log("temp:", weatherData.days[0].temp);
    console.log("condition:", weatherData.days[0].conditions);
    console.log("rain:", weatherData.days[0].precipprob);
    console.log("wind:", weatherData.days[0].windspeed);

    day.textContent = weatherData.days[0].datetime;
    temp.textContent = `${weatherData.days[0].temp}F`;
    condition.textContent = weatherData.days[0].conditions;
    rain.textContent = `Precipitation: ${weatherData.days[0].precipprob}%`;
    wind.textContent = `${weatherData.days[0].windspeed} mph`;
    // const catData = await response.json();
    // img.src = catData.data.images.original.url;
  } catch (error) {
    console.log(error);
  }
}

// add loop that does getWeather 7 times, one for each day of the week
// add DOM elements that input this data into the HTML

getWeather();
console.log("hello");
