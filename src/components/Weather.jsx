import './Weather.css'
import search_icon from '../assests/search.png'
import clear_icon from '../assests/clear.png'
import cloud_icon from '../assests/cloud.png'
import drizzle_icon from '../assests/drizzle.png'
import humidity_icon from '../assests/humidity.png'
import rain_icon from '../assests/rain.png'
import snow_icon from '../assests/snow.png'
import wind_icon from '../assests/wind.png'
import { useEffect, useRef, useState } from 'react'


function Weather() {
  const inputRef =useRef()
  
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }
  const search = async (city) => {
    
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url)
      const data = await response.json()
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      })
      console.log(data);

    }
    catch (error) {
      
      setWeatherData(false)
      console.log('fail to fetch');


    }
  }

  useEffect(() => {
    search('')
  }, [])
  return (
    

    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="search" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
      <img src={weatherData.icon} alt="icons" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span> Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={weatherData.icon} alt="wind" />
          <div>
            <p>{weatherData.windSpeed}km/h</p>
            <span> wind speed</span>
          </div>
        </div>
      </div>
      </>:<div> Not valid city name</div>}
    </div>
   

  )
}

export default Weather