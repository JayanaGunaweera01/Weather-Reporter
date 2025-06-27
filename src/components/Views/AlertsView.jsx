import React, { useState } from 'react';
import './Views.css';

const AlertsView = ({ currentLocation }) => {
  const [alertSettings, setAlertSettings] = useState({
    temperature: { enabled: true, threshold: 35 },
    rain: { enabled: true, threshold: 80 },
    wind: { enabled: false, threshold: 50 },
    uv: { enabled: true, threshold: 8 }
  });

  // Mock weather alerts - in a real app, these would come from weather services
  const mockAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Temperature Alert',
      message: 'Temperature expected to reach 36°C today. Stay hydrated and avoid prolonged sun exposure. Consider indoor activities during peak hours (12 PM - 4 PM).',
      severity: 'moderate',
      icon: 'thermometer-outline',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'watch',
      title: 'Rain Expected',
      message: 'Light rain expected between 2 PM - 6 PM. Chance of precipitation: 75%. Carry an umbrella and drive carefully.',
      severity: 'low',
      icon: 'rainy-outline',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'UV Index High',
      message: 'UV index is 9 (Very High). Use SPF 30+ sunscreen and wear protective clothing. Limit outdoor activities during midday.',
      severity: 'moderate',
      icon: 'sunny-outline',
      time: '6 hours ago'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ff4757';
      case 'moderate': return '#ffa726';
      case 'low': return '#66bb6a';
      default: return '#42a5f5';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return 'warning-outline';
      case 'watch': return 'eye-outline';
      case 'info': return 'information-circle-outline';
      default: return 'notifications-outline';
    }
  };

  const handleAlertToggle = (alertType) => {
    setAlertSettings(prev => ({
      ...prev,
      [alertType]: {
        ...prev[alertType],
        enabled: !prev[alertType].enabled
      }
    }));
  };

  const handleThresholdChange = (alertType, newThreshold) => {
    setAlertSettings(prev => ({
      ...prev,
      [alertType]: {
        ...prev[alertType],
        threshold: newThreshold
      }
    }));
  };

  const dismissAlert = (alertId) => {
    console.log('Dismissing alert:', alertId);
    // In a real app, this would remove the alert from the list
  };

  const viewAlertDetails = (alertId) => {
    console.log('Viewing details for alert:', alertId);
    // In a real app, this would show more detailed information
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>Weather Alerts</h1>
        <p>Stay informed about weather conditions in {currentLocation}</p>
      </div>

      <div className="alerts-content">
        {/* Current Alerts */}
        <div className="alerts-section">
          <h2>
            <ion-icon name="notifications-outline"></ion-icon>
            Active Alerts
          </h2>
          <div className="alerts-list">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className={`alert-card alert-${alert.type}`}>
                <div className="alert-header">
                  <div className="alert-icon">
                    <ion-icon 
                      name={getAlertIcon(alert.type)}
                      style={{ color: getSeverityColor(alert.severity) }}
                    ></ion-icon>
                  </div>
                  <div className="alert-info">
                    <h3>{alert.title}</h3>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                  <div className={`alert-severity severity-${alert.severity}`}>
                    {alert.severity}
                  </div>
                </div>
                <div className="alert-message">
                  <p>{alert.message}</p>
                </div>
                <div className="alert-actions">
                  <button 
                    className="btn-dismiss"
                    onClick={() => dismissAlert(alert.id)}
                  >
                    <ion-icon name="checkmark-outline"></ion-icon>
                    Dismiss
                  </button>
                  <button 
                    className="btn-details"
                    onClick={() => viewAlertDetails(alert.id)}
                  >
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Settings */}
        <div className="alerts-section">
          <h2>
            <ion-icon name="settings-outline"></ion-icon>
            Alert Settings
          </h2>
          <div className="alert-settings">
            <div className="setting-item">
              <div className="setting-header">
                <div className="setting-info">
                  <ion-icon name="thermometer-outline"></ion-icon>
                  <span>High Temperature Alert</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={alertSettings.temperature.enabled}
                    onChange={() => handleAlertToggle('temperature')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              {alertSettings.temperature.enabled && (
                <div className="threshold-setting">
                  <label>Alert when temperature exceeds:</label>
                  <div className="threshold-input">
                    <input
                      type="number"
                      value={alertSettings.temperature.threshold}
                      onChange={(e) => handleThresholdChange('temperature', parseInt(e.target.value))}
                      min="20"
                      max="50"
                    />
                    <span>°C</span>
                  </div>
                </div>
              )}
            </div>

            <div className="setting-item">
              <div className="setting-header">
                <div className="setting-info">
                  <ion-icon name="rainy-outline"></ion-icon>
                  <span>Rain Alert</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={alertSettings.rain.enabled}
                    onChange={() => handleAlertToggle('rain')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              {alertSettings.rain.enabled && (
                <div className="threshold-setting">
                  <label>Alert when rain chance exceeds:</label>
                  <div className="threshold-input">
                    <input
                      type="number"
                      value={alertSettings.rain.threshold}
                      onChange={(e) => handleThresholdChange('rain', parseInt(e.target.value))}
                      min="0"
                      max="100"
                    />
                    <span>%</span>
                  </div>
                </div>
              )}
            </div>

            <div className="setting-item">
              <div className="setting-header">
                <div className="setting-info">
                  <ion-icon name="leaf-outline"></ion-icon>
                  <span>Wind Alert</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={alertSettings.wind.enabled}
                    onChange={() => handleAlertToggle('wind')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              {alertSettings.wind.enabled && (
                <div className="threshold-setting">
                  <label>Alert when wind speed exceeds:</label>
                  <div className="threshold-input">
                    <input
                      type="number"
                      value={alertSettings.wind.threshold}
                      onChange={(e) => handleThresholdChange('wind', parseInt(e.target.value))}
                      min="10"
                      max="200"
                    />
                    <span>km/h</span>
                  </div>
                </div>
              )}
            </div>

            <div className="setting-item">
              <div className="setting-header">
                <div className="setting-info">
                  <ion-icon name="sunny-outline"></ion-icon>
                  <span>UV Index Alert</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={alertSettings.uv.enabled}
                    onChange={() => handleAlertToggle('uv')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              {alertSettings.uv.enabled && (
                <div className="threshold-setting">
                  <label>Alert when UV index exceeds:</label>
                  <div className="threshold-input">
                    <input
                      type="number"
                      value={alertSettings.uv.threshold}
                      onChange={(e) => handleThresholdChange('uv', parseInt(e.target.value))}
                      min="1"
                      max="15"
                    />
                    <span>UVI</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="notification-settings">
            <h3>Notification Preferences</h3>
            <div className="notification-options">
              <label>
                <input type="checkbox" defaultChecked />
                <span>Push notifications</span>
              </label>
              <label>
                <input type="checkbox" defaultChecked />
                <span>Email alerts</span>
              </label>
              <label>
                <input type="checkbox" />
                <span>SMS notifications</span>
              </label>
              <label>
                <input type="checkbox" defaultChecked />
                <span>Sound alerts</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsView;