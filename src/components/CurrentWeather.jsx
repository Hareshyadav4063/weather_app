import React from 'react';

const CurrentWeather = ({ currentWeather }) => {
  if (!currentWeather || !currentWeather.temperature) return null;

  return (
    <div className="current-weather">
      {/* Use WeatherAPI icon URL directly */}
      <img
        src={currentWeather.weatherIcon}
        alt={currentWeather.description}
        className="weather-icon"
      />

      {/* City name */}
      <h2 className="city-name">{currentWeather.city}</h2>

      {/* Temperature */}
      <h2 className="temperature">
        {currentWeather.temperature}
        <span>ºC</span>
      </h2>

      {/* Weather description */}
      <p className="description">{currentWeather.description}</p>
    </div>
  );
};

export default CurrentWeather;
