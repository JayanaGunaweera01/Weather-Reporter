import React, { useState, useEffect } from 'react';
import './Views.css';

const MapView = ({ currentLocation }) => {
  const [selectedLayer, setSelectedLayer] = useState('temperature');
  const [coordinates, setCoordinates] = useState({ lat: 6.9271, lon: 79.8612 }); // Default to Colombo
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);

  const mapLayers = [
    { 
      id: 'temperature', 
      name: 'Temperature', 
      icon: 'thermometer-outline',
      description: 'Temperature distribution across the region'
    },
    { 
      id: 'precipitation', 
      name: 'Precipitation', 
      icon: 'rainy-outline',
      description: 'Rainfall and precipitation patterns'
    },
    { 
      id: 'wind', 
      name: 'Wind Speed', 
      icon: 'leaf-outline',
      description: 'Wind speed and direction'
    },
    { 
      id: 'clouds', 
      name: 'Cloud Cover', 
      icon: 'cloudy-outline',
      description: 'Cloud coverage density'
    },
    { 
      id: 'pressure', 
      name: 'Pressure', 
      icon: 'speedometer-outline',
      description: 'Atmospheric pressure systems'
    }
  ];

  // Get coordinates for the current location
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1';
        
        if (API_KEY && currentLocation) {
          const response = await fetch(
            `${BASE_URL}/current.json?key=${API_KEY}&q=${currentLocation}&aqi=no`
          );
          
          if (response.ok) {
            const data = await response.json();
            setCoordinates({ lat: data.location.lat, lon: data.location.lon });
            setCurrentWeather({
              temp: data.current.temp_c,
              condition: data.current.condition.text,
              icon: data.current.condition.icon,
              humidity: data.current.humidity,
              windSpeed: data.current.wind_kph,
              pressure: data.current.pressure_mb
            });
          }
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
        // Keep default coordinates
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [currentLocation]);

  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000!2d${coordinates.lon}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1647875231234!5m2!1sen!2s`;
  };

  const getOpenStreetMapUrl = () => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lon-0.1},${coordinates.lat-0.1},${coordinates.lon+0.1},${coordinates.lat+0.1}&layer=mapnik&marker=${coordinates.lat},${coordinates.lon}`;
  };

  const openExternalWeatherMap = () => {
    const url = `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temp&lat=${coordinates.lat}&lon=${coordinates.lon}&zoom=10`;
    window.open(url, '_blank');
  };

  const openWindyMap = () => {
    const layer = selectedLayer === 'temperature' ? 'temp' : 
                  selectedLayer === 'precipitation' ? 'rain' :
                  selectedLayer === 'wind' ? 'wind' :
                  selectedLayer === 'clouds' ? 'clouds' : 'pressure';
    
    const url = `https://windy.com/${coordinates.lat}/${coordinates.lon}?${layer},${coordinates.lat},${coordinates.lon},10`;
    window.open(url, '_blank');
  };

  const renderMap = () => {
    if (loading) {
      return (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <span>Loading map data...</span>
        </div>
      );
    }

    return (
      <div className="simple-map-container">
        {/* Basic Map Display */}
        <div className="map-display">
          <iframe
            src={getOpenStreetMapUrl()}
            width="100%"
            height="400"
            style={{ border: 'none', borderRadius: '1rem' }}
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>

        {/* Weather Overlay */}
        <div className="weather-overlay">
          <div className="weather-card">
            <div className="weather-icon">
              {currentWeather?.icon && (
                <img src={`https:${currentWeather.icon}`} alt={currentWeather.condition} />
              )}
            </div>
            <div className="weather-info">
              <h3>{currentLocation}</h3>
              <div className="weather-temp">{currentWeather?.temp || '--'}°C</div>
              <div className="weather-condition">{currentWeather?.condition || 'Loading...'}</div>
            </div>
          </div>
          
          <div className="weather-details">
            <div className="detail">
              <ion-icon name="water-outline"></ion-icon>
              <span>{currentWeather?.humidity || '--'}%</span>
            </div>
            <div className="detail">
              <ion-icon name="leaf-outline"></ion-icon>
              <span>{currentWeather?.windSpeed || '--'} km/h</span>
            </div>
            <div className="detail">
              <ion-icon name="speedometer-outline"></ion-icon>
              <span>{currentWeather?.pressure || '--'} mb</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>Weather Map</h1>
        <p>Location and weather information for {currentLocation}</p>
      </div>
      
      <div className="map-view-content">
        <div className="map-controls">
          <h3>Weather Layer Options</h3>
          <div className="layer-buttons">
            {mapLayers.map((layer) => (
              <button
                key={layer.id}
                className={`layer-btn ${selectedLayer === layer.id ? 'active' : ''}`}
                onClick={() => setSelectedLayer(layer.id)}
                title={layer.description}
              >
                <ion-icon name={layer.icon}></ion-icon>
                <span>{layer.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="map-container">
          {renderMap()}
        </div>

        <div className="map-actions">
          <div className="map-action-buttons">
            <button 
              className="btn-primary"
              onClick={openExternalWeatherMap}
            >
              <ion-icon name="globe-outline"></ion-icon>
              Open Weather Map
            </button>
            <button 
              className="btn-secondary"
              onClick={openWindyMap}
            >
              <ion-icon name="cloud-outline"></ion-icon>
              Open Windy Map
            </button>
            <button 
              className="btn-outline"
              onClick={() => {
                const url = `https://www.google.com/maps/search/${encodeURIComponent(currentLocation)}`;
                window.open(url, '_blank');
              }}
            >
              <ion-icon name="location-outline"></ion-icon>
              Google Maps
            </button>
          </div>
        </div>

        <div className="map-info">
          <div className="current-layer-info">
            <h4>
              <ion-icon name={mapLayers.find(l => l.id === selectedLayer)?.icon}></ion-icon>
              Selected Layer: {mapLayers.find(l => l.id === selectedLayer)?.name}
            </h4>
            <p>{mapLayers.find(l => l.id === selectedLayer)?.description}</p>
          </div>
          
          <div className="map-features">
            <div className="feature">
              <ion-icon name="location-outline"></ion-icon>
              <span>Current location: {currentLocation}</span>
            </div>
            <div className="feature">
              <ion-icon name="globe-outline"></ion-icon>
              <span>Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lon.toFixed(4)}</span>
            </div>
            <div className="feature">
              <ion-icon name="time-outline"></ion-icon>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="feature">
              <ion-icon name="open-outline"></ion-icon>
              <span>Click buttons to open interactive maps</span>
            </div>
          </div>
        </div>
        
        <div className="weather-layer-info">
          <h4>Weather Layer Information</h4>
          <div className="layer-descriptions">
            {mapLayers.map((layer) => (
              <div 
                key={layer.id} 
                className={`layer-desc ${selectedLayer === layer.id ? 'active' : ''}`}
              >
                <div className="layer-header">
                  <ion-icon name={layer.icon}></ion-icon>
                  <strong>{layer.name}</strong>
                </div>
                <p>{layer.description}</p>
                {selectedLayer === layer.id && (
                  <div className="layer-actions">
                    <button 
                      className="view-layer-btn"
                      onClick={selectedLayer === 'temperature' ? openExternalWeatherMap : openWindyMap}
                    >
                      View {layer.name} Layer
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;