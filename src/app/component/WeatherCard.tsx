"use client";
import { useState, useEffect } from "react";

interface WeatherData {
  temp_c: number;
  humidity: number;
  wind_kph: number;
  condition: {
    text: string;
    icon: string;
  };
}

interface WeatherCardProps {
  city: string;
  onDelete: () => void;
}

export default function WeatherCard({ city, onDelete }: WeatherCardProps) {
  const API_KEY = "aefbe7260c8b49de962132425250303";
  const API_URL = "http://api.weatherapi.com/v1/current.json";

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        setWeatherData(data.current);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading) {
    return <div className="weather-card loading">Loading {city}...</div>;
  }

  if (error) {
    return <div className="weather-card error">{error}</div>;
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="weather-card">
      <button className="delete-btn" onClick={onDelete}>×</button>
      <h3>{city}</h3>
      <div className="weather-info">
        <div className="weather-condition">
          <img src={weatherData.condition.icon} alt={weatherData.condition.text} />
          <span>{weatherData.condition.text}</span>
        </div>
        <p>Temperature: {weatherData.temp_c}°C</p>
        <p>Humidity: {weatherData.humidity}%</p>
        <p>Wind: {weatherData.wind_kph} km/h</p>
      </div>
    </div>
  );
}