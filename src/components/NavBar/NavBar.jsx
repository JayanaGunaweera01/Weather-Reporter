import React, { useState } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.png";

const NavBar = ({ currentView, onNavigate, mobileOpen, onMobileClose }) => {
  const [activeItem, setActiveItem] = useState(currentView || 'home');

  const navigationItems = [
    {
      id: 'home',
      icon: 'home-outline',
      label: 'Home',
      description: 'Current weather dashboard'
    },
    {
      id: 'forecast',
      icon: 'calendar-outline',
      label: 'Forecast',
      description: '7-day weather forecast'
    },
    {
      id: 'map',
      icon: 'map-outline',
      label: 'Map',
      description: 'Weather radar & maps'
    },
    {
      id: 'alerts',
      icon: 'notifications-outline',
      label: 'Alerts',
      description: 'Weather warnings'
    },
    {
      id: 'favorites',
      icon: 'heart-outline',
      label: 'Favorites',
      description: 'Saved locations'
    },
    {
      id: 'settings',
      icon: 'settings-outline',
      label: 'Settings',
      description: 'App preferences'
    }
  ];

  const handleNavigation = (itemId) => {
    setActiveItem(itemId);
    if (onNavigate) {
      onNavigate(itemId);
    }
  };

  // Update active item when currentView changes
  React.useEffect(() => {
    setActiveItem(currentView);
  }, [currentView]);

  return (
    <section className={`nav-section ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Mobile close button */}
      <button 
        className="mobile-close"
        onClick={onMobileClose}
        aria-label="Close navigation"
      >
        <ion-icon name="close-outline"></ion-icon>
      </button>

      <nav>
        <div className="nav-header">
          <img src={logo} alt="Weather App Logo" />
          <h3>WeatherPro</h3>
        </div>
        
        <ul className="nav-main">
          {navigationItems.map((item) => (
            <li 
              key={item.id}
              className={activeItem === item.id ? 'active' : ''}
              onClick={() => handleNavigation(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNavigation(item.id);
                }
              }}
              title={item.description}
              tabIndex={0}
              role="button"
              aria-label={`Navigate to ${item.label}`}
            >
              <ion-icon name={item.icon}></ion-icon>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        
        <ul className="nav-footer">
          <li 
            onClick={() => handleNavigation('logout')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavigation('logout');
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Log out"
          >
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Log out</span>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default NavBar;
