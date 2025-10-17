import React from 'react'
const SearchSection = ({ getWeatherDetails }) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const handleCitySearch = (e) => {
        const searchInput = e.target.querySelector(".search-input");
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
        getWeatherDetails(API_URL);
        console.log(searchInput.value);
    };

    // Gets user's current location (latitude/longitude)
    const handleLocationSearch = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {

                const { latitude, longitude } = position.coords;
                const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
                getWeatherDetails(API_URL); // Fetches weather details as per user's current location
                console.log(position)
            }, () => {
                alert("Location access denied.Please enable permissions to use this feature.")
            }
        );
    };

    return (
        <div className="search-section">
            <form action="#" className="search-form" onSubmit={handleCitySearch}>
                {/* Search Section */}
                <span className="material-symbols-rounded">search</span>

                <input
                    type="search"
                    placeholder="Enter a city name"
                    className="search-input"
                    required
                />
            </form>

            <button className="location-button" onClick={handleLocationSearch}>
                {/* Rounded location icon */}
                <span className="material-symbols-rounded">my_location</span>
            </button>
        </div>
    )
}

export default SearchSection