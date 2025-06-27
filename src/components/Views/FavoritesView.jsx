import React, { useState } from 'react';
import './Views.css';

const FavoritesView = ({ onLocationSelect }) => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Colombo',
      country: 'Sri Lanka',
      temp: 31,
      condition: 'Patchy rain nearby',
      icon: 'https://cdn.weatherapi.com/weather/64x64/day/176.png',
      isDefault: true
    },
    {
      id: 2,
      name: 'London',
      country: 'United Kingdom',
      temp: 18,
      condition: 'Partly cloudy',
      icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
      isDefault: false
    },
    {
      id: 3,
      name: 'New York',
      country: 'United States',
      temp: 22,
      condition: 'Sunny',
      icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
      isDefault: false
    }
  ]);

  const [newLocation, setNewLocation] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const setAsDefault = (id) => {
    setFavorites(favorites.map(fav => ({
      ...fav,
      isDefault: fav.id === id
    })));
  };

  const addToFavorites = () => {
    if (newLocation.trim()) {
      // In a real app, you'd fetch weather data for the new location
      const newFav = {
        id: Date.now(),
        name: newLocation,
        country: 'Unknown',
        temp: '--',
        condition: 'Loading...',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
        isDefault: false
      };
      setFavorites([...favorites, newFav]);
      setNewLocation('');
      setIsAdding(false);
    }
  };

  const selectLocation = (location) => {
    if (onLocationSelect) {
      onLocationSelect(`${location.name}, ${location.country}`);
    }
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>Favorite Locations</h1>
        <p>Quick access to your saved weather locations</p>
      </div>

      <div className="favorites-actions">
        <button 
          className="add-location-btn"
          onClick={() => setIsAdding(!isAdding)}
        >
          <ion-icon name="add-outline"></ion-icon>
          Add Location
        </button>
      </div>

      {isAdding && (
        <div className="add-location-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter city name..."
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addToFavorites()}
            />
            <button onClick={addToFavorites} className="btn-primary">
              <ion-icon name="checkmark-outline"></ion-icon>
              Add
            </button>
            <button onClick={() => setIsAdding(false)} className="btn-secondary">
              <ion-icon name="close-outline"></ion-icon>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="favorites-grid">
        {favorites.map((location) => (
          <div key={location.id} className={`favorite-card ${location.isDefault ? 'default' : ''}`}>
            {location.isDefault && (
              <div className="default-badge">
                <ion-icon name="star"></ion-icon>
                Default
              </div>
            )}
            
            <div className="favorite-header">
              <div className="location-info">
                <h3>{location.name}</h3>
                <p>{location.country}</p>
              </div>
              <div className="favorite-actions">
                <button 
                  className="action-btn"
                  onClick={() => setAsDefault(location.id)}
                  title="Set as default"
                >
                  <ion-icon name={location.isDefault ? "star" : "star-outline"}></ion-icon>
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => removeFavorite(location.id)}
                  title="Remove from favorites"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </div>
            </div>

            <div className="weather-info" onClick={() => selectLocation(location)}>
              <div className="weather-icon">
                <img src={location.icon} alt={location.condition} />
              </div>
              <div className="weather-details">
                <div className="temperature">
                  {location.temp}°C
                </div>
                <div className="condition">
                  {location.condition}
                </div>
              </div>
              <div className="view-details">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </div>
            </div>

            <div className="last-updated">
              <ion-icon name="time-outline"></ion-icon>
              <span>Updated {Math.floor(Math.random() * 30)} min ago</span>
            </div>
          </div>
        ))}

        {favorites.length === 0 && (
          <div className="empty-state">
            <ion-icon name="heart-outline"></ion-icon>
            <h3>No Favorite Locations</h3>
            <p>Add your frequently checked locations for quick access</p>
            <button 
              className="btn-primary"
              onClick={() => setIsAdding(true)}
            >
              <ion-icon name="add-outline"></ion-icon>
              Add Your First Location
            </button>
          </div>
        )}
      </div>

      <div className="favorites-tips">
        <h3>Pro Tips</h3>
        <ul>
          <li>
            <ion-icon name="star-outline"></ion-icon>
            Set a default location for quick app startup
          </li>
          <li>
            <ion-icon name="notifications-outline"></ion-icon>
            Enable alerts for your favorite locations
          </li>
          <li>
            <ion-icon name="sync-outline"></ion-icon>
            Weather data updates automatically every 15 minutes
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FavoritesView;