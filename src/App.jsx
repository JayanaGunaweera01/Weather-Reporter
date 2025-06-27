import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import ForecastView from "./components/Views/ForecastView";
import MapView from "./components/Views/MapView";
import AlertsView from "./components/Views/AlertsView";
import FavoritesView from "./components/Views/FavoritesView";
import SettingsView from "./components/Views/SettingsView";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('Colombo');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Fetch weather data function
  const fetchWeatherData = async (location = 'Colombo') => {
    try {
      setLoading(true);
      setError(null);
      
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1';
      
      if (!API_KEY) {
        throw new Error('Weather API key is not configured.');
      }

      // Fetch current weather and forecast
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=yes`),
        fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`)
      ]);
      
      if (!currentResponse.ok) {
        const errorText = await currentResponse.text();
        throw new Error(`Weather API Error: ${currentResponse.status} - ${errorText}`);
      }
      
      if (!forecastResponse.ok) {
        const errorText = await forecastResponse.text();
        throw new Error(`Forecast API Error: ${forecastResponse.status} - ${errorText}`);
      }
      
      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();
      
      // Format the data
      const formattedData = {
        current: {
          location: {
            name: currentData.location.name,
            country: currentData.location.country,
            region: currentData.location.region,
            localtime: currentData.location.localtime
          },
          current: {
            temp_c: currentData.current.temp_c,
            temp_f: currentData.current.temp_f,
            condition: currentData.current.condition.text,
            icon: currentData.current.condition.icon,
            humidity: currentData.current.humidity,
            wind_kph: currentData.current.wind_kph,
            wind_mph: currentData.current.wind_mph,
            wind_dir: currentData.current.wind_dir,
            pressure_mb: currentData.current.pressure_mb,
            uv: currentData.current.uv,
            feelslike_c: currentData.current.feelslike_c,
            feelslike_f: currentData.current.feelslike_f,
            cloud: currentData.current.cloud,
            vis_km: currentData.current.vis_km,
            gust_kph: currentData.current.gust_kph || 0,
            is_day: currentData.current.is_day
          },
          airQuality: currentData.current.air_quality ? {
            co: currentData.current.air_quality.co,
            no2: currentData.current.air_quality.no2,
            o3: currentData.current.air_quality.o3,
            so2: currentData.current.air_quality.so2,
            pm2_5: currentData.current.air_quality.pm2_5,
            pm10: currentData.current.air_quality.pm10,
            us_epa_index: currentData.current.air_quality['us-epa-index'],
            gb_defra_index: currentData.current.air_quality['gb-defra-index']
          } : null
        },
        forecast: {
          forecast: forecastData.forecast.forecastday.map(day => ({
            date: day.date,
            date_epoch: day.date_epoch,
            day: {
              maxtemp_c: day.day.maxtemp_c,
              mintemp_c: day.day.mintemp_c,
              avgtemp_c: day.day.avgtemp_c,
              condition: day.day.condition.text,
              icon: day.day.condition.icon,
              humidity: day.day.avghumidity,
              wind_kph: day.day.maxwind_kph,
              uv: day.day.uv,
              chance_of_rain: day.day.daily_chance_of_rain,
              chance_of_snow: day.day.daily_chance_of_snow
            },
            astro: {
              sunrise: day.astro.sunrise,
              sunset: day.astro.sunset,
              moonrise: day.astro.moonrise,
              moonset: day.astro.moonset,
              moon_phase: day.astro.moon_phase
            }
          }))
        }
      };
      
      setWeatherData(formattedData);
      setCurrentLocation(location);
      
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Search locations function
  const searchLocations = async (query) => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1';
      
      const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${query}`);
      
      if (!response.ok) {
        throw new Error(`Search API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching locations:', error);
      return [];
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    if (query.trim()) {
      await fetchWeatherData(query.trim());
      setSearchQuery('');
      setMobileNavOpen(false); // Close mobile nav after search
    }
  };

  // Handle navigation
  const handleNavigation = (viewId) => {
    if (viewId === 'logout') {
      if (confirm('Are you sure you want to log out?')) {
        console.log('Logging out...');
      }
      return;
    }
    setCurrentView(viewId);
    setMobileNavOpen(false); // Close mobile nav after navigation
  };

  // Handle location selection from favorites
  const handleLocationSelect = async (location) => {
    await fetchWeatherData(location);
    setCurrentView('home');
    setMobileNavOpen(false);
  };

  // Handle mobile nav toggle
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  // Close mobile nav when clicking outside
  const handleOverlayClick = () => {
    setMobileNavOpen(false);
  };

  // Initial load
  useEffect(() => {
    fetchWeatherData('Colombo');
  }, []);

  // Close mobile nav on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render the appropriate view based on currentView
  const renderCurrentView = () => {
    switch (currentView) {
      case 'forecast':
        return (
          <ForecastView 
            weatherData={weatherData} 
            currentLocation={currentLocation} 
          />
        );
      case 'map':
        return (
          <MapView 
            currentLocation={currentLocation} 
          />
        );
      case 'alerts':
        return (
          <AlertsView 
            currentLocation={currentLocation} 
          />
        );
      case 'favorites':
        return (
          <FavoritesView 
            onLocationSelect={handleLocationSelect} 
          />
        );
      case 'settings':
        return <SettingsView />;
      case 'home':
      default:
        return (
          <Dashboard 
            weatherData={weatherData}
            loading={loading}
            error={error}
            onRefresh={() => fetchWeatherData(currentLocation)}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Navigation Toggle */}
      <button 
        className="mobile-nav-toggle"
        onClick={toggleMobileNav}
        aria-label="Toggle navigation"
      >
        <ion-icon name={mobileNavOpen ? "close-outline" : "menu-outline"}></ion-icon>
      </button>

      {/* Mobile Overlay */}
      {mobileNavOpen && (
        <div 
          className="mobile-overlay"
          onClick={handleOverlayClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998,
            display: window.innerWidth < 1024 ? 'block' : 'none'
          }}
        />
      )}

      {/* Navigation */}
      <NavBar 
        currentView={currentView}
        onNavigate={handleNavigation}
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />

      {/* Main Content */}
      <div className="main-content">
        <Header 
          currentLocation={currentLocation}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onSearchLocations={searchLocations}
          loading={loading}
        />
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default App;