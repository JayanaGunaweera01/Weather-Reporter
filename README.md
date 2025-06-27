# Weather Reporter

A comprehensive weather application built with React that provides real-time weather information, forecasts, interactive maps, and customizable alerts.

## 🌤️ Features

- **Home Dashboard**: Clean, intuitive interface displaying current weather conditions
- **Weather Forecast**: Detailed 7-day weather forecasts with hourly breakdowns
- **Interactive Map**: Visual weather map with radar, temperature, and precipitation overlays
- **Weather Alerts**: Real-time severe weather warnings and notifications
- **Settings**: Customizable preferences for units, locations, and alert preferences

## 📸 Screenshots

### Home Dashboard
![Home Dashboard](https://github.com/JayanaGunaweera01/Weather-Reporter/blob/main/src/assets/home.jpg?raw=true)
*Main dashboard showing current weather conditions and quick overview*

### Weather Forecast
![Weather Forecast](https://github.com/JayanaGunaweera01/Weather-Reporter/blob/main/src/assets/forecast.jpg?raw=true)
*Detailed 7-day weather forecast with hourly data*

### Interactive Weather Map
![Weather Map](https://github.com/JayanaGunaweera01/Weather-Reporter/blob/main/src/assets/map.jpg?raw=true)
*Interactive map with weather overlays and radar data*

### Weather Alerts
![Weather Alerts](https://github.com/JayanaGunaweera01/Weather-Reporter/blob/main/src/assets/alert.jpg?raw=true)
*Real-time weather alerts and severe weather warnings*

### Settings Panel
![Settings](https://github.com/JayanaGunaweera01/Weather-Reporter/blob/main/src/assets/setting.jpg?raw=true)
*Customizable settings for units, locations, and preferences*

## 🚀 Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/JayanaGunaweera01/Weather-Reporter.git
cd Weather-Reporter
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```env
REACT_APP_WEATHER_API_KEY=your_weather_api_key_here
REACT_APP_MAP_API_KEY=your_map_api_key_here
```

4. Start the development server
```bash
npm run dev
```

## 📋 Available Scripts

### `npm run dev`
Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


## 🛠️ Built With

- **React** - Frontend framework
- **Create React App** - Build tool and development environment
- **Weather API** - Real-time weather data
- **Map Integration** - Interactive weather maps
- **Responsive Design** - Mobile-friendly interface

## 🌐 API Integration

This application integrates with various weather APIs to provide:
- Current weather conditions
- Extended forecasts
- Weather alerts and warnings
- Radar and satellite imagery
- Historical weather data

## 📱 Responsive Design

The Weather Reporter is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🔧 Configuration

### Weather Units
- Temperature: Celsius/Fahrenheit
- Wind Speed: mph/km/h/m/s
- Pressure: hPa/inHg/mmHg
- Visibility: miles/kilometers

### Location Settings
- GPS-based location detection
- Manual location search and selection
- Multiple saved locations
- Location-based weather alerts

## 📊 Features Overview

### Home Dashboard
- Current temperature and conditions
- "Feels like" temperature
- Humidity and wind information
- UV index and visibility
- Sunrise/sunset times

### Forecast Section
- Hourly forecast for next 24 hours
- Daily forecast for next 7 days
- Precipitation probability
- Temperature highs and lows

### Weather Map
- Real-time radar imagery
- Temperature overlay
- Precipitation tracking
- Storm tracking capabilities

### Alert System
- Severe weather warnings
- Push notifications
- Customizable alert types
- Location-based alerts

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project
2. Deploy the `build` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

