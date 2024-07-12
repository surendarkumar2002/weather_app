import PropTypes from "prop-types";

const WeatherDetails = ({
  icon,
  temp,
  city,
  humidity,
  country,
  wind,
  lat,
  log,
  humidityIcon,
  windIcon,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="clear icons" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">longtitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidityicon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{wind} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="windIcon" className="icon" />
          <div className="data">
            <div className="wind-percent">{humidity}km/h</div>
            <div className="text">Humidity</div>
          </div>
        </div>
      </div>
    </>
  );
};

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  humidityIcon: PropTypes.string.isRequired,
  windIcon: PropTypes.string.isRequired,
};

export default WeatherDetails;
