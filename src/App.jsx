import React, { useState, useEffect } from 'react';
import SearchSection from './components/SearchSection';
import CurrentWeather from './components/CurrentWeather';
import HourlyWeatherItem from './components/HourlyWeatherItem';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY; // Vite environment variable

  // Filter hourly data for next 24 hours
  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    setHourlyForecasts(next24HoursData);
  };

  // Fetch weather details from API
  const getWeatherDetails = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Weather API data:", data); // debug

      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const city = data.location.name; // city name
      const weatherIcon = data.current.condition.icon; // full icon URL

      setCurrentWeather({ temperature, description, city, weatherIcon });

      // Combine hourly data from both forecast days
      const combinedHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];
      filterHourlyForecast(combinedHourlyData);

    } catch (error) {
      console.log(error);
    }
  };

  // Get weather by latitude & longitude
  const getWeatherByLocation = (lat, lon) => {
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=2&aqi=no&alerts=no`;
    getWeatherDetails(API_URL);
  };

  // Auto-detect location on page load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByLocation(latitude, longitude);
        },
        (error) => {
          console.error(error);
          alert("Please enable location access to get your current weather.");
        }
      );
    } else {
      alert("Geolocation not supported in your browser.");
    }
  }, []);

  return (
    <div className="container">
      <SearchSection getWeatherDetails={getWeatherDetails} />

      {/* Weather Section */}
      <div className="weather-section">
        <CurrentWeather currentWeather={currentWeather} />

        {/* Hourly Weather Forecast */}
        <div className="hourly-forecast">
          <ul className="weather-list">
            {hourlyForecasts.map((hourlyWeather) => (
              <HourlyWeatherItem
                key={hourlyWeather.time_epoch}
                hourlyWeather={hourlyWeather}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
