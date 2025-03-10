"use client";
import { useEffect, useState } from "react";
import "./estilo.css";

interface WeatherData {
  temp_c: string;
  humidity: string;
  wind_kph: string;
}

export default function Home() {
  const API_KEY = "aefbe7260c8b49de962132425250303";
  const API_URL = "http://api.weatherapi.com/v1/current.json";

  const [city, setCity] = useState("");
  const [cityData, setData] = useState<WeatherData>({
    temp_c: "",
    humidity: "",
    wind_kph: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`).then((res) =>
        res.json()
      );
      setData(data.current);
    } catch (failed) {
      setError(failed instanceof Error ? failed.message : "An error occurred");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div>
      <main>
        <h1 className="header">Project with API</h1>

        <div>
          <form className="box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search City"
              className="search"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </form>
        </div>

        {!error && cityData && (
          <div className="info_box">
            <p>{city}</p>
            <p>{cityData.temp_c}°C</p>
            <p>{cityData.humidity}%</p>
            <p>{cityData.wind_kph} km/h</p>
          </div>
        )}

        {error && <div className="error_box">{error}</div>}
      </main>
    </div>
  );
}