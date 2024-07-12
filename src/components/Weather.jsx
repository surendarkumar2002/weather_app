// images
import searchIcon from "../assets/search.png";
import cloudIcon from "../assets/clouds.png";
import drizzleIcon from "../assets/drizzle.png";
import humidityIcon from "../assets/humidity.png";
import mistIcon from "../assets/mist.png";
import rainIcon from "../assets/rain.png";
import clearIcon from "../assets/clear.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import WeatherDetails from "./WeatherDetails";
import { useEffect, useState } from "react";
import axios from 'axios';

const Weather = () => {
  const [icon, setIcon] = useState(snowIcon);
  const [text, setText] = useState("Chennai");
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const WeatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50n": mistIcon,
    "50d": mistIcon,
  };



  const search = async () => {
    setLoading(true);
    const api_key = "0b303a5110b4fe5598a5a8c424841b08";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  
    try {
      // axios
      let res = await axios.get(url);
      let data = res.data;
  
      //  city is found
      if (data.cod === 404) {
        console.error("city not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
  
      // Process your data here
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(WeatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      
      if (error.response && error.response.status === 404) {
        console.error("city not found");
        setCityNotFound(true);
      } else {
        console.log("An error occurred ", error.message);
        setError("An error occurred while fetching weather data.");
      }
    } finally {
      
      setLoading(false);
    }
  };
  

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          className="cityInput"
          onChange={handleCity}
          placeholder="Search City"
          value={text}
          onKeyDown={handleKeyDown}
        />
        <div className="search-icon">
          <img src={searchIcon} alt="search" onClick={() => search()} />
        </div>
      </div>

      {loading && <div className="loading-msg">loading...</div>}
      {error && <div className="error-msg">{error}</div>}
      {cityNotFound && <div className="city-notfound">city not found</div>}

      {!loading && !cityNotFound && (
        <WeatherDetails
          wind={wind}
          humidity={humidity}
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidityIcon={humidityIcon}
          windIcon={windIcon}
        />
      )}

      <p className="copyright">
        Designed by <span>surendarkumar</span>
      </p>
    </div>
  );
};

export default Weather;
