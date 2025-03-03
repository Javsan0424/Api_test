"use client";
import { useState } from "react";
import "./estilo.css";

export default function Home() {
  const API_KEY = "aefbe7260c8b49de962132425250303"
  const API_URL = "http://api.weatherapi.com/v1/current.json";

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <main>
        <h1 className="header">Project with API</h1>

        <div>
          <form onSubmit={fetchWeather} className="box">
            <input
              type="text"
              className="search"
              placeholder="Search a city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </form>
        </div>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.location.name}</h2>
            <p>{weatherData.current.condition.text}</p>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind: {weatherData.current.wind_kph} km/h</p>
          </div>
        )}
      </main>
    </div>
  );
}