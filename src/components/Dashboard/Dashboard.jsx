import React from "react";
import "./Dashboard.css";

// Import weather icons (you'll need to add these to your assets)
import sunCloudy from "../../assets/sun-cloudy.png";
import Rain from "../../assets/rain.png";
import PartlySunny from "../../assets/partly-sunny.png";
import SunWindy from "../../assets/sun-windy.png";
import Compass from "../../assets/compass.png";
import Drops from "../../assets/drops.png";
import Ultraviolet from "../../assets/ultraviolet.png";

const Dashboard = ({ weatherData, loading, error, onRefresh }) => {
  // Loading component
  const LoadingSpinner = () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <span>Loading weather data...</span>
    </div>
  );

  // Error component
  const ErrorComponent = () => (
    <div className="error-container">
      <ion-icon name="alert-circle-outline"></ion-icon>
      <h3>Unable to load weather data</h3>
      <p>{error}</p>
      <button onClick={onRefresh} className="retry-button">
        <ion-icon name="refresh-outline"></ion-icon>
        Retry
      </button>
    </div>
  );

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    if (!condition) return PartlySunny;
    
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
      return Rain;
    } else if (conditionLower.includes('cloud') && conditionLower.includes('sun')) {
      return sunCloudy;
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return sunCloudy;
    } else if (conditionLower.includes('wind')) {
      return SunWindy;
    } else if (conditionLower.includes('partly') || conditionLower.includes('partial')) {
      return PartlySunny;
    } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return PartlySunny;
    }
    
    return PartlySunny; // Default
  };

  // Format date for forecast
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  // Get UV index description
  const getUVDescription = (uvIndex) => {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
  };

  // Get air quality description
  const getAirQualityDescription = (index) => {
    if (!index) return 'N/A';
    switch (index) {
      case 1: return 'Good';
      case 2: return 'Moderate';
      case 3: return 'Unhealthy for sensitive';
      case 4: return 'Unhealthy';
      case 5: return 'Very Unhealthy';
      case 6: return 'Hazardous';
      default: return 'N/A';
    }
  };

  if (loading) {
    return (
      <section className="dashboard-section">
        <LoadingSpinner />
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="dashboard-section">
        <ErrorComponent />
      </section>
    );
  }
  
  if (!weatherData) {
    return (
      <section className="dashboard-section">
        <LoadingSpinner />
      </section>
    );
  }

  const { current, forecast } = weatherData;
  const currentWeather = current.current;
  const location = current.location;
  const forecastData = forecast.forecast || [];

  return (
    <section className="dashboard-section">
      <div className="home">
        {/* Main Weather Display */}
        <div className="feed-1">
          <div className="feeds">
            <img src={getWeatherIcon(currentWeather.condition)} alt={currentWeather.condition} />
            <div>
              <div>
                <span>{location.name}, {location.country}</span>
                <span>{currentWeather.condition}</span>
              </div>
              <div>
                <span>
                  {Math.round(currentWeather.temp_c)} <sup>°C</sup>
                </span>
              </div>
            </div>
          </div>
          
          {/* Forecast Cards */}
          <div className="feed">
            {forecastData.slice(1, 3).map((day, index) => (
              <div key={index}>
                <div>
                  <img src={getWeatherIcon(day.day.condition)} alt={day.day.condition} />
                  <span>
                    {Math.round(day.day.maxtemp_c)} <sup>°C</sup>
                  </span>
                </div>
                <div>
                  <span>{formatDate(day.date)}</span>
                  <span>{day.day.condition.split(' ').slice(0, 2).join(' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Highlights */}
        <div className="highlights">
          <h2>Today's Highlights</h2>
          <div className="all-highlights">
            {/* Feels Like */}
            <div>
              <div>
                <img src={Compass} alt="Feels like" />
                <div>
                  <span>Feels Like</span>
                  <span>Temperature</span>
                </div>
              </div>
              <div>
                <span>
                  {Math.round(currentWeather.feelslike_c)} <sup>°C</sup>
                </span>
              </div>
            </div>

            {/* Cloud Coverage */}
            <div>
              <div>
                <img src={sunCloudy} alt="Cloud coverage" />
                <div>
                  <span>Cloud</span>
                  <span>Coverage</span>
                </div>
              </div>
              <div>
                <span>
                  {currentWeather.cloud} <sup>%</sup>
                </span>
              </div>
            </div>

            {/* Humidity */}
            <div>
              <div>
                <img src={Drops} alt="Humidity" />
                <div>
                  <span>Humidity</span>
                  <span>{currentWeather.humidity > 70 ? 'High' : currentWeather.humidity > 30 ? 'Normal' : 'Low'}</span>
                </div>
              </div>
              <div>
                <span>
                  {currentWeather.humidity} <sup>%</sup>
                </span>
              </div>
            </div>

            {/* Wind Speed */}
            <div>
              <div>
                <img src={SunWindy} alt="Wind speed" />
                <div>
                  <span>Wind Speed</span>
                  <span>{currentWeather.wind_dir}</span>
                </div>
              </div>
              <div>
                <span>
                  {Math.round(currentWeather.wind_kph)} <sup>km/h</sup>
                </span>
              </div>
            </div>

            {/* UV Index */}
            <div>
              <div>
                <img src={Ultraviolet} alt="UV Index" />
                <div>
                  <span>UV Index</span>
                  <span>{getUVDescription(currentWeather.uv)}</span>
                </div>
              </div>
              <div>
                <span>
                  {currentWeather.uv} <sup>UVI</sup>
                </span>
              </div>
            </div>

            {/* Visibility */}
            <div>
              <div>
                <img src={PartlySunny} alt="Visibility" />
                <div>
                  <span>Visibility</span>
                  <span>Clear</span>
                </div>
              </div>
              <div>
                <span>
                  {currentWeather.vis_km} <sup>km</sup>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Sidebar */}
      <div className="cities">
        <h2>Weather Details</h2>
        <div className="all-cities">
          {/* Pressure */}
          <div>
            <div>
              <img src={Compass} alt="Pressure" />
              <div>
                <span>Pressure</span>
                <span>Atmospheric pressure</span>
              </div>
            </div>
            <div>
              <span>
                {currentWeather.pressure_mb} <sup>mb</sup>
              </span>
            </div>
          </div>

          {/* Wind Gust */}
          <div>
            <div>
              <img src={SunWindy} alt="Wind gust" />
              <div>
                <span>Wind Gust</span>
                <span>Maximum wind speed</span>
              </div>
            </div>
            <div>
              <span>
                {Math.round(currentWeather.gust_kph || 0)} <sup>km/h</sup>
              </span>
            </div>
          </div>

          {/* Air Quality */}
          {current.airQuality && current.airQuality.us_epa_index && (
            <div>
              <div>
                <img src={Drops} alt="Air quality" />
                <div>
                  <span>Air Quality</span>
                  <span>{getAirQualityDescription(current.airQuality.us_epa_index)}</span>
                </div>
              </div>
              <div>
                <span>
                  {current.airQuality.us_epa_index}
                </span>
              </div>
            </div>
          )}

          {/* Local Time */}
          <div>
            <div>
              <img src={PartlySunny} alt="Local time" />
              <div>
                <span>Local Time</span>
                <span>{new Date(location.localtime).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
            </div>
            <div>
              <span>
                {currentWeather.is_day ? 'Day' : 'Night'}
              </span>
            </div>
          </div>

          <button onClick={onRefresh} className="refresh-button">
            <span>Refresh Data</span>
            <ion-icon name="refresh-outline"></ion-icon>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
