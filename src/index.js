import "./style.css";

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
