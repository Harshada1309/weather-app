import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'


const Weather = () => {
const [search,setSearch]=useState("")
const [weather,setWeather]=useState({})
const [error, setError] = useState('');
 
const api = {
    key : "ffe7b635d54e1f7fdb52056387b720ef",
    base : "https://api.openweathermap.org/data/2.5/weather"
}
function handleSearch(){
  fetch(`${api.base}?utf8=✓&q=${search}&units=metrics&APPID=${api.key}`)
  .then(res=>res.json())
  .then(d=>setWeather(d))
}

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const apiKey = 'ffe7b635d54e1f7fdb52056387b720ef'; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        axios.get(apiUrl)
          .then(response => {
            setWeather(response.data);
          })
          .catch(() => {
            setError('Weather information for current location not available.');
          });
      },
      () => {
        setError('Unable to fetch current location weather.');
      }
    );
  } else {
    setError('Geolocation is not supported by this browser.');
  }
}, []);


  return (
    <div className="card">
      <input type="search" placeholder="Enter Your City" onChange={(e)=>setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        {(typeof weather.main !== "undefined")?(<div>
          <h2>Current Weather</h2>
          <p>Location : {weather.name}</p>
          <p>Temparature : {weather.main.temp}°C</p>
          <p>Feels like : {weather.weather[0].main}</p>
          <p>Description : {weather.weather[0].description}</p>
        
        </div>):("Not Found")}
      </div>
    </div>
  )
}

export default Weather