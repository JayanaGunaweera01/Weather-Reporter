import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ 
  currentLocation, 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  onSearchLocations,
  loading 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const getCurrentDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Hide suggestions if input is empty
    if (!value.trim()) {
      setShowSuggestions(false);
      setSuggestions([]);
      return;
    }

    // Debounce search to avoid too many API calls
    const newTimeout = setTimeout(async () => {
      if (value.length >= 2 && onSearchLocations) {
        try {
          const locations = await onSearchLocations(value);
          setSuggestions(locations.slice(0, 5)); // Limit to 5 suggestions
          setShowSuggestions(locations.length > 0);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }
    }, 500); // Wait 500ms after user stops typing
    
    setSearchTimeout(newTimeout);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (location) => {
    setSearchQuery('');
    setShowSuggestions(false);
    onSearch(`${location.name}, ${location.country}`);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <section className="header-section">
      <div className="location-info">
        <ion-icon name="location-outline"></ion-icon>
        <span>{currentLocation}</span>
      </div>
      
      <div className="search-container">
        <div className="search-wrapper">
          <input 
            type="text" 
            placeholder="Search for a city..." 
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            disabled={loading}
          />
          <ion-icon 
            name="search-outline" 
            onClick={handleSearch}
            className={loading ? 'loading' : ''}
          />
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((location, index) => (
              <div 
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(location)}
              >
                <ion-icon name="location-outline"></ion-icon>
                <span>{location.name}, {location.region}, {location.country}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="header-actions">
        <div className="date-display">
          <span>{getCurrentDate()}</span>
        </div>
        <ion-icon name="calendar-outline"></ion-icon>
        <ion-icon name="notifications-outline"></ion-icon>
      </div>
    </section>
  );
};

export default Header;
