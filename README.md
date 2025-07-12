
# 🌦️ Weather App

**A dynamic and user-friendly weather application built with React**, designed to provide current weather conditions and 5-day/3-hour forecasts for any location worldwide.

---

## 📄 Description

Weather App is a web application that allows users to check the current weather and forecast for their location or any city they search for.

It features:
- A clean, custom-designed UI
- Support for **dark and light modes**
- Interactive weather visualizations
- A map view
- City suggestions based on selected country

---

### 📁 Country & City Data

A custom JSON file was created containing **193 countries**, and for each country, **5 cities** were included. This data is used to provide city suggestions based on the selected country on the **Map page**, ensuring relevant nearby city options.

## 🚀 Demo

🔗 **Live Demo**: [https://yourweatherappaz.netlify.app/](https://yourweatherappaz.netlify.app/)

---

## ✨ Features

- 🎨 **Custom UI**: Visually appealing interface designed to match the developer's vision.
- 🌙 **Dark/Light Mode**: Toggle between themes using custom context and state management.
- 📍 **Geolocation Support**: Automatically fetches user's current location via `navigator.geolocation`.
- ☁️ **Weather Data via OpenWeather API**:
  - Current weather conditions
  - 5-day / 3-hour forecast
- 🔆 **Custom Weather Icons**: Custom components (e.g., Sunny, Moon) mapped dynamically to weather conditions.
- 🔎 **Search Bar**: Search weather by city name.
- 🗺️ **Map Integration**: View the location on an interactive map.
- 🌐 **Country-Based City Suggestions**: Up to 5 cities per selected country from a custom JSON file (193 countries).
- ⚙️ **Settings Panel**:
  - Temperature units (°C / °F)
  - Time format (12h / 24h)
  - Wind speed units (km/h / mph)
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.

---

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ahmedabdelaziz19196/Weather-App.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Weather-App
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env` file in the root directory and add your OpenWeather API key:**
   ```env
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```

   > 💡 You can get an API key by signing up at [https://openweathermap.org/api](https://openweathermap.org/api)

5. **Start the development server:**
   ```bash
   npm start
   ```

6. **Open your browser and navigate to:**

   [http://localhost:3000](http://localhost:3000)

> ✅ The app should load and display your current location's weather if geolocation is enabled.

---

## 🧪 Usage

- **Check Current Weather**: On load, the app uses geolocation to display the weather for your current location.
- **Search for a City**: Use the search bar to enter any city name and view its weather data.
- **View Forecast**: Scroll to see the 5-day/3-hour weather forecast.
- **Toggle Dark/Light Mode**: Use the theme toggle button to switch between dark and light modes.
- **Adjust Settings**: Go to the settings section to change temperature units, time format, or wind speed units.
- **Explore Map**: View the map for the selected location.
- **City Suggestions**: Select a country to see up to 5 suggested cities and their weather.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Make your changes and commit**:
   ```bash
   git commit -m "Add your feature"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-feature
   ```
5. **Open a Pull Request**

> 📌 Please ensure your code follows the project's coding style and includes appropriate documentation.

---

## 📜 License

This project is licensed under the **MIT License**.
