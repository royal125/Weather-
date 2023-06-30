import React, { useEffect, useState } from 'react';
import './style.css';
import Geo from './Geo'
function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');

    const API_KEY = "1815b2003ad4cef38e6b16343a9034ca";

    const getForecastByCoordinates = async (latitude, longitude) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        setWeatherData(data);
    };

    const getForecast = async (city) => {
        if (city.length === 0) {
            setError("Please enter the city");
        } else {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === "404") {
                setError("City not found");
            } else {
                setWeatherData(data);
                setError("");
            }
        }
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
        setError(""); // Clear the error when the user starts typing
    };

    useEffect(() => {
        // Get geolocation coordinates
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getForecastByCoordinates(latitude, longitude);
        });
    }, []);

    return (

        <div className="text-center container pt-4 animated-background">
            <Geo />
            <div className='we'>Weather of {weatherData?.name || 'Your Current Location'}</div>
            <br />
            <div className="input-container">
                <input className='text-center' type="search" value={city} onChange={handleCityChange} placeholder="Enter city name" required />
                <button className='btn bt' onClick={() => getForecast(city)}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
            {error && <div className="error-message">{error} !</div>}
            <div className='container'>
                {weatherData ? (
                    <>
                        <div className='weather-text text-center'>Temperature: {weatherData?.main?.temp}&#8451;</div>
                        <div className='weather-text'>Humidity: {weatherData?.main?.humidity}%</div>
                        <div className='weather-text'>Weather: {weatherData?.weather?.[0]?.description}</div>
                    </>
                ) : (
                    <div>Loading weather data...</div>
                )}
            </div>
        </div>
    );
}

export default Weather;
