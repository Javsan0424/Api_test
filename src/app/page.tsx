"use client";
import { useEffect, useState } from "react";
import "./estilo.css";
import { clear, error } from "console";

export default function Home() {
  const API_KEY = "aefbe7260c8b49de962132425250303";
  const API_URL = "http://api.weatherapi.com/v1/current.json";

  const [city,setCity] = useState("")
  const [citydata,setData] = useState(null)
  const [error, setError] = useState(null)

  const HandleSearch = async(event) => {
    event.preventDefault();
    try{
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
      if(!response.ok){
        setError("Error: City not found");
        setData(null);
      }
      else{
        setData(await response.json());
        setError(null);
      }
    } catch(failed){
      setError(failed.message); 
    }
  }

  useEffect(() => {
    if(error){
      const timer = setTimeout(() => setError(null), 3000);
      return() => clearTimeout(timer);
    } 
  }, [error]);

  return (
    <div>
      <main>
        <h1 className="header">Project with API</h1>

        <div>
          <form className="box" onSubmit={HandleSearch}>
            <input type="text" placeholder="Search City" className="search" value={city} onChange={(e) => setCity(e.target.value)}/>
          </form>
        </div>

    

        {!error && citydata && (
          <div className="info_box">
            <p>{city}</p>
            <p>{citydata.current.temp_c}°C</p>
            <p>{citydata.current.humidity}%</p>
            <p>{citydata.current.wind_kph} km/h</p>
          </div>
        )}

        {error && (
          <div className="error_box" >
            {error}
          </div>
        )}


      
       
      </main>
    </div>
  );
}