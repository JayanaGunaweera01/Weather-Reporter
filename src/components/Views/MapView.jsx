import React, { useState } from 'react';
import './Views.css';

const MapView = ({ currentLocation }) => {
  const [selectedLayer, setSelectedLayer] = useState('temperature');
  
  const mapLayers = [
    { id: 'temperature', name: 'Temperature', icon: 'thermometer-outline' },
    { id: 'precipitation', name: 'Precipitation', icon: 'rainy-outline' },
    { id: 'wind', name: 'Wind Speed', icon: 'leaf-outline' },
    { id: 'clouds', name: 'Cloud Cover', icon: 'cloudy-outline' },
    { id: 'pressure', name: 'Pressure', icon: 'speedometer-outline' }
  ];

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>Weather Map</h1>
        <p>Interactive weather radar and maps for {currentLocation}</p>
      </div>
      
      <div className="map-view-content">
        <div className="map-controls">
          <h3>Map Layers</h3>
          <div className="layer-buttons">
            {mapLayers.map((layer) => (
              <button
                key={layer.id}
                className={`layer-btn ${selectedLayer === layer.id ? 'active' : ''}`}
                onClick={() => setSelectedLayer(layer.id)}
                aria-pressed={selectedLayer === layer.id}
              >
                <ion-icon name={layer.icon}></ion-icon>
                <span>{layer.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-content">
              <ion-icon name="map-outline"></ion-icon>
              <h3>Weather Map - {mapLayers.find(l => l.id === selectedLayer)?.name}</h3>
              <p>Interactive weather maps would be displayed here with real-time weather data overlays</p>
              
              <div className="map-features">
                <div className="feature">
                  <ion-icon name="location-outline"></ion-icon>
                  <span>Current: {currentLocation}</span>
                </div>
                <div className="feature">
                  <ion-icon name="layers-outline"></ion-icon>
                  <span>Layer: {mapLayers.find(l => l.id === selectedLayer)?.name}</span>
                </div>
                <div className="feature">
                  <ion-icon name="time-outline"></ion-icon>
                  <span>Updated: {new Date().toLocaleTimeString()}</span>
                </div>
                <div className="feature">
                  <ion-icon name="refresh-outline"></ion-icon>
                  <span>Auto-refresh: 15 min</span>
                </div>
                <div className="feature">
                  <ion-icon name="resize-outline"></ion-icon>
                  <span>Interactive Zoom</span>
                </div>
                <div className="feature">
                  <ion-icon name="analytics-outline"></ion-icon>
                  <span>Real-time Data</span>
                </div>
              </div>
              
              <div className="integration-note">
                <h4>🗺️ Available Map Integration Options:</h4>
                <ul>
                  <li><strong>OpenWeatherMap:</strong> Weather Maps API with radar and satellite data</li>
                  <li><strong>Mapbox:</strong> Interactive maps with custom weather overlays</li>
                  <li><strong>Google Maps:</strong> Weather layers with traffic and terrain data</li>
                  <li><strong>Windy.com:</strong> Embedded maps with advanced weather visualizations</li>
                  <li><strong>Weather Underground:</strong> Hyperlocal weather radar and forecasts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="map-legend">
          <h4>Map Legend</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color" style={{background: 'linear-gradient(to right, #0066cc, #ff6600)'}}></div>
              <span>Temperature Range (-10°C to 40°C)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{background: 'linear-gradient(to right, #66ccff, #0033cc)'}}></div>
              <span>Precipitation (Light to Heavy)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{background: 'linear-gradient(to right, #90EE90, #FF4500)'}}></div>
              <span>Wind Speed (0-100 km/h)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{background: 'linear-gradient(to right, #f0f0f0, #333333)'}}></div>
              <span>Cloud Coverage (0-100%)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{background: 'linear-gradient(to right, #ff9999, #006600)'}}></div>
              <span>Atmospheric Pressure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;