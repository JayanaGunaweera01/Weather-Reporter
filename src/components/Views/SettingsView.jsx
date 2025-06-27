import React, { useState } from 'react';
import './Views.css';

const SettingsView = () => {
  const [settings, setSettings] = useState({
    temperatureUnit: 'celsius',
    windSpeedUnit: 'kmh',
    pressureUnit: 'mb',
    timeFormat: '24h',
    language: 'en',
    theme: 'auto',
    autoLocation: true,
    notifications: true,
    dataUsage: 'normal',
    refreshInterval: '15'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        temperatureUnit: 'celsius',
        windSpeedUnit: 'kmh',
        pressureUnit: 'mb',
        timeFormat: '24h',
        language: 'en',
        theme: 'auto',
        autoLocation: true,
        notifications: true,
        dataUsage: 'normal',
        refreshInterval: '15'
      });
    }
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>Settings</h1>
        <p>Customize your weather app experience</p>
      </div>

      <div className="settings-content">
        {/* Units Section */}
        <div className="settings-section">
          <h2>
            <ion-icon name="calculator-outline"></ion-icon>
            Units
          </h2>
          
          <div className="setting-item">
            <label>Temperature Unit</label>
            <div className="setting-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="temperature"
                  value="celsius"
                  checked={settings.temperatureUnit === 'celsius'}
                  onChange={(e) => handleSettingChange('temperatureUnit', e.target.value)}
                />
                <span>Celsius (°C)</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="temperature"
                  value="fahrenheit"
                  checked={settings.temperatureUnit === 'fahrenheit'}
                  onChange={(e) => handleSettingChange('temperatureUnit', e.target.value)}
                />
                <span>Fahrenheit (°F)</span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <label>Wind Speed Unit</label>
            <select
              value={settings.windSpeedUnit}
              onChange={(e) => handleSettingChange('windSpeedUnit', e.target.value)}
            >
              <option value="kmh">km/h</option>
              <option value="mph">mph</option>
              <option value="ms">m/s</option>
              <option value="knots">knots</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Pressure Unit</label>
            <select
              value={settings.pressureUnit}
              onChange={(e) => handleSettingChange('pressureUnit', e.target.value)}
            >
              <option value="mb">millibars (mb)</option>
              <option value="hpa">hectopascals (hPa)</option>
              <option value="inhg">inches (inHg)</option>
              <option value="mmhg">mmHg</option>
            </select>
          </div>
        </div>

        {/* Display Section */}
        <div className="settings-section">
          <h2>
            <ion-icon name="desktop-outline"></ion-icon>
            Display
          </h2>

          <div className="setting-item">
            <label>Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="auto">Auto (System)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Time Format</label>
            <div className="setting-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="timeFormat"
                  value="12h"
                  checked={settings.timeFormat === '12h'}
                  onChange={(e) => handleSettingChange('timeFormat', e.target.value)}
                />
                <span>12-hour (AM/PM)</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="timeFormat"
                  value="24h"
                  checked={settings.timeFormat === '24h'}
                  onChange={(e) => handleSettingChange('timeFormat', e.target.value)}
                />
                <span>24-hour</span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <label>Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="si">Sinhala</option>
              <option value="ta">Tamil</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>

        {/* Privacy & Location Section */}
        <div className="settings-section">
          <h2>
            <ion-icon name="location-outline"></ion-icon>
            Privacy & Location
          </h2>

          <div className="setting-item">
            <div className="setting-toggle">
              <div>
                <label>Auto-detect Location</label>
                <p>Automatically use your current location for weather updates</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.autoLocation}
                  onChange={(e) => handleSettingChange('autoLocation', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-toggle">
              <div>
                <label>Push Notifications</label>
                <p>Receive weather alerts and updates</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Data & Performance Section */}
        <div className="settings-section">
          <h2>
            <ion-icon name="speedometer-outline"></ion-icon>
            Data & Performance
          </h2>

          <div className="setting-item">
            <label>Data Usage</label>
            <select
              value={settings.dataUsage}
              onChange={(e) => handleSettingChange('dataUsage', e.target.value)}
            >
              <option value="low">Low (Reduce images and animations)</option>
              <option value="normal">Normal (Balanced)</option>
              <option value="high">High (Best quality)</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Auto-refresh Interval</label>
            <select
              value={settings.refreshInterval}
              onChange={(e) => handleSettingChange('refreshInterval', e.target.value)}
            >
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="never">Never (Manual only)</option>
            </select>
          </div>
        </div>

        {/* App Info Section */}
        <div className="settings-section">
          <h2>
            <ion-icon name="information-circle-outline"></ion-icon>
            About
          </h2>

          <div className="app-info">
            <div className="info-item">
              <span>App Version</span>
              <span>1.0.0</span>
            </div>
            <div className="info-item">
              <span>Weather Data Provider</span>
              <span>WeatherAPI.com</span>
            </div>
            <div className="info-item">
              <span>Last Updated</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="app-actions">
            <button className="btn-secondary" onClick={resetSettings}>
              <ion-icon name="refresh-outline"></ion-icon>
              Reset to Defaults
            </button>
            <button className="btn-outline">
              <ion-icon name="help-circle-outline"></ion-icon>
              Help & Support
            </button>
            <button className="btn-outline">
              <ion-icon name="document-text-outline"></ion-icon>
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;