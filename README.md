#Weather App
A dynamic and user-friendly weather application built with React, designed to provide current weather conditions and 5-day/3-hour forecasts for any location worldwide.
Description
Weather App is a web application that allows users to check the current weather and forecast for their location or any city they search for. It features a clean, custom-designed UI with support for dark and light modes, interactive weather visualizations, and additional features like a map view and city suggestions based on the selected country.
Demo

Live Demo: https://yourweatherappaz.netlify.app/

Features

Custom UI: A visually appealing interface designed to match the developer's vision.
Dark/Light Mode: Toggle between dark and light themes using a custom-built context and state management system.
Geolocation Support: Automatically fetches the user's current location (latitude and longitude) using the browser's navigator.geolocation API.
Weather Data: Integrates with the OpenWeather API to display:
Current weather conditions.
5-day/3-hour weather forecast.


Custom Weather Icons: Replaced default OpenWeather API icons with custom components (e.g., Sunny, Moon) sourced from a GitHub repository, dynamically mapped to weather conditions.
Search Bar: Allows users to search for weather data by city name worldwide.
Map Integration: Displays a map for the selected location (either via geolocation or search).
Country-Based City Suggestions: Displays up to 5 cities from the selected country, sourced from a custom JSON file containing 193 countries and their cities.
Settings: Customizable options for:
Temperature units (e.g., Celsius/Fahrenheit).
Time format (12-hour/24-hour).
Wind speed units (e.g., km/h, mph).


Responsive Design: Optimized for both desktop and mobile devices.

Technologies Used

React: Frontend library for building the user interface.
JavaScript (ES6+): Core programming language.
OpenWeather API: For fetching current weather and forecast data.
Context API: For managing global state (e.g., dark/light mode, settings).
Material UI: Component library for building a polished and responsive UI with pre-designed components.
Custom JSON: For storing country and city data.
CSS: For styling, including dark/light mode theming.
External Libraries: Custom weather icon components sourced from a GitHub repository.
Geolocation API: For accessing the user's location.
Map Integration: For displaying location-based maps.
Postman: Used for testing and validating the OpenWeather API endpoints during development.

Installation

Clone the repository:git clone https://github.com/Ahmedabdelaziz19196/Weather-App.git


Navigate to the project directory:cd Weather-App


Install dependencies:npm install


Create a .env file in the root directory and add your OpenWeather API key:REACT_APP_OPENWEATHER_API_KEY=your_api_key_here

(You can get an API key from OpenWeather.)
Start the development server:npm start


Open your browser and navigate to http://localhost:3000.

Usage

Check Current Weather: On load, the app uses geolocation to display the weather for your current location.
Search for a City: Use the search bar to enter any city name and view its weather data.
View Forecast: Scroll to see the 5-day/3-hour weather forecast.
Toggle Dark/Light Mode: Use the theme toggle button to switch between dark and light modes.
Adjust Settings: Go to the settings section to change temperature units, time format, or wind speed units.
Explore Map: View the map for the selected location.
City Suggestions: Select a country to see up to 5 suggested cities and their weather.

Contributing

Contributions are welcome! To contribute:
Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit them (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.


Please ensure your code follows the project's coding style and includes appropriate documentation.

License
MIT License
