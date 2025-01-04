# Weather App

A React-based weather application that displays the current weather.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/weather-app.git
   ```
2. Navigate to the project directory:
   ```
   cd weather-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).
2. Replace the `apiKey` variable in the `Weather.jsx` file with your API key:
   ```javascript
   const apiKey = "your-api-key-here";
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open your web browser and navigate to `http://localhost:3000`.
5. Enter a city name in the input field and click the "Search" button to view the current weather and 5-day forecast.

## API

The Weather App uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. The following API endpoints are used:

- Current weather: `http://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric`
