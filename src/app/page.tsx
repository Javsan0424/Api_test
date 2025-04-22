"use client";
import { useState } from "react";
import WeatherCard from "./component/WeatherCard";
import "./estilo.css";

export default function Home() {
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (cityInput.trim() && !cities.includes(cityInput.trim())) {
      setCities([...cities, cityInput.trim()]);
      setCityInput("");
    }
  };

  const handleDelete = (cityToDelete: string) => {
    setCities(cities.filter(city => city !== cityToDelete));
  };

  return (
    <div>
      <main>
        <h1 className="header">Weather Dashboard</h1>

        <div>
          <form className="box" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search City"
              className="search"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
            <button type="submit" className="search-btn">Add City</button>
          </form>
        </div>

        <div className="weather-cards-container">
          {cities.length === 0 ? (
            <div className="empty-state">Search for a city to see weather information</div>
          ) : (
            cities.map(city => (
              <WeatherCard 
                key={city} 
                city={city} 
                onDelete={() => handleDelete(city)} 
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}