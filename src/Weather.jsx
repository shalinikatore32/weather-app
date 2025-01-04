import React, { useState, useEffect } from "react";
import "./WeatherInfo.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Bhokardan"); // Default city
  const [inputCity, setInputCity] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch current weather data
        const weatherResponse = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!weatherResponse.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const weatherData = await weatherResponse.json();
        console.log("Current weather data:", weatherData);
        setWeatherData(weatherData);

        // Fetch 5-day forecast data
        const forecastResponse = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!forecastResponse.ok) {
          throw new Error("Failed to fetch forecast data");
        }
        const forecastData = await forecastResponse.json();
        const filteredData = forecastData.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        );
        console.log("Forecast data:", filteredData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  const handleCityChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleCitySubmit = () => {
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity(""); // Clear the input field after submission
    }
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!weatherData) {
    return <div className="loading">Loading...</div>;
  }

  const weatherCondition = weatherData.weather[0].main.toLowerCase();

  const weatherIcons = {
    clear: "🌞",
    clouds: "☁️",
    rain: "🌧️",
    drizzle: "🌦️",
    thunderstorm: "⛈️",
    snow: "❄️",
    mist: "🌫️",
    fog: "🌁",
    haze: "🌥️",
    smoke: "💨",
  };

  const icon = weatherIcons[weatherCondition] || "🌍"; // Default icon if not matched

  // Dynamic background style based on weather condition
  const backgroundStyle = {
    backgroundColor:
      weatherCondition === "clear"
        ? "#87CEEB"
        : weatherCondition.includes("cloud")
        ? "#B0C4DE"
        : weatherCondition.includes("rain")
        ? "#4682B4"
        : "#d3d3d3",
  };

  return (
    <div className="weather-container" style={backgroundStyle}>
      <div className="weather-header">
        <h1>Weather in {weatherData.name}</h1>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <div className="city-input">
          <input
            type="text"
            value={inputCity}
            onChange={handleCityChange}
            placeholder="Enter city"
          />
          <button onClick={handleCitySubmit}>Search</button>
        </div>
      </div>
      <div className="weather-details">
        <div className="temperature">
          <h2>{weatherData.main.temp}°C</h2>
          <p>{weatherData.weather[0].description}</p>
        </div>
        <div className="weather-icon">
          <span>{icon}</span>
        </div>
        <div className="additional-info">
          <p>Wind: {weatherData.wind.speed} km/h</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>
            Sunrise:{" "}
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            Sunset:{" "}
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
