import React from 'react';
import './Views.css';

const ForecastView = ({ weatherData, currentLocation }) => {
  if (!weatherData || !weatherData.forecast) {
    return (
      <div className="view-container">
        <div className="view-header">
          <h1>7-Day Forecast</h1>
          <p>Extended weather forecast for {currentLocation}</p>
        </div>
        <div className="loading-message">
          <p>Loading forecast data...</p>
        </div>
      </div>
    );
  }

  const forecast = weatherData.forecast.forecast;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>7-Day Forecast</h1>
        <p>Extended weather forecast for {currentLocation}</p>
      </div>
      
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">
              <h3>{formatDate(day.date)}</h3>
              <p>{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
            
            <div className="forecast-icon">
              <img src={`https:${day.day.icon}`} alt={day.day.condition} />
            </div>
            
            <div className="forecast-temps">
              <span className="temp-high">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="temp-low">{Math.round(day.day.mintemp_c)}°</span>
            </div>
            
            <div className="forecast-condition">
              <p>{day.day.condition}</p>
            </div>
            
            <div className="forecast-details">
              <div className="detail-item">
                <ion-icon name="water-outline"></ion-icon>
                <span>{day.day.chance_of_rain}%</span>
              </div>
              <div className="detail-item">
                <ion-icon name="eye-outline"></ion-icon>
                <span>{day.day.humidity}%</span>
              </div>
              <div className="detail-item">
                <ion-icon name="sunny-outline"></ion-icon>
                <span>{day.day.uv} UV</span>
              </div>
            </div>
            
            <div className="forecast-astro">
              <div className="astro-item">
                <ion-icon name="sunny-outline"></ion-icon>
                <span>{day.astro.sunrise}</span>
              </div>
              <div className="astro-item">
                <ion-icon name="moon-outline"></ion-icon>
                <span>{day.astro.sunset}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastView;