import React from 'react';

const HourlyWeatherItem = ({ hourlyWeather }) => {
  const temperature = Math.floor(hourlyWeather.temp_c);
  const time = hourlyWeather.time.split(" ")[1].substring(0, 5);
  const weatherIcon = hourlyWeather.condition.icon; // Use API icon directly

  return (
    <li className='weather-item'>
      <p className='time'>{time}</p>
      <img src={weatherIcon} alt={hourlyWeather.condition.text} className='weather-icon' />
      <p className="temperature">{temperature}º</p>
    </li>
  );
};

export default HourlyWeatherItem;
