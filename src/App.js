import { useEffect, useReducer, useState } from "react";
import "./App.css";
import NavBar from "./Component/NavBar";
import { LightDarkContext } from "./Context/LightDarkContext";
import { TimeFormat } from "./Context/Formats";
import { WindFormat } from "./Context/Formats";
import { TmepFormat } from "./Context/Formats";
import ResutReducer from "./Reducers/ResultReducer";
import { Routes, Route } from "react-router-dom";
import Weather from "./Component/Weather";
import Map from "./Component/Map";
import SearchBar from "./Component/SearchBar";
import ToggleTheme from "./Component/ToggleTheme";
//MUI
import Grid from "@mui/material/Grid";

import TheSwitchWeatherIcon from "./Functions/TheSwitchWeatherIcon";
import axios from "axios";

function App() {
    // let [darkTheme, setDarkTheme] = useState(true);
    let [darkTheme, dispatch] = useReducer(ResutReducer, true);
    let [timeFormat, setTimeFormat] = useState("24h");
    let [windFormat, setWindFormat] = useState("km/h");
    let [tempFormat, setTempFormat] = useState("celsius");

    const [location, setLocation] = useState({
        currentCountry: "",
        currentLocation: "",
        currentLat: "",
        currentLon: "",
    });
    // handle dark and light theme
    function handleDarkLightTheme() {
        dispatch({
            type: "changeTheme",
            payload: darkTheme,
        });
    }
    // handle dark and light theme

    //handle time format
    function handleTimeFormat(value) {
        let newFormat = value === "24h" ? "24h" : "12h";
        setTimeFormat(newFormat);
        localStorage.setItem("TimeFormat", newFormat);
    }
    //handle time format

    //handle wind format
    function handleWindFormat(value) {
        let newFormat = value === "km/h" ? "km/h" : "kts";
        setWindFormat(newFormat);
        localStorage.setItem("WindFormat", newFormat);
    }
    //handle wind format

    //handle temp formats
    function handleTmepFormat(value) {
        let newFormat = value === "celsius" ? "celsius" : "fahrenheit";
        setTempFormat(newFormat);
        localStorage.setItem("tempFormat", newFormat);
    }
    //handle temp format

    // get theme from the local storage
    useEffect(() => {
        dispatch({
            type: "getTheme",
        });
    }, []);
    // get theme from the local storage

    let [currentWeather, setCurrentWeather] = useState({
        theTemp: "",
        maxTemp: "",
        minTemp: "",
        realFeel: "",
        wind: "",
        icon: "",
        date: "",
    });
    //current weather
    let [foreCastWeather, setForeCastWeather] = useState([
        { date: "", temp: "", time: "", icon: "" },
        { date: "", temp: "", time: "", icon: "" },
        { date: "", temp: "", time: "", icon: "" },
        { date: "", temp: "", time: "", icon: "" },
        { date: "", temp: "", time: "", icon: "" },
        { date: "", temp: "", time: "", icon: "" },
    ]);
    //forecast Weather

    let [weatherIcon, setWeatherIcon] = useState({
        mainIcon: null,
        hourOneIcon: null,
        hourTwoIcon: null,
        hourThreeIcon: null,
        hourFourIcon: null,
        hourFiveIcon: null,
        hourSixIcon: null,
        dayOneIcon: null,
        dayTwoIcon: null,
        dayThreeIcon: null,
        dayFourIcon: null,
        dayFiveIcon: null,
    });

    let [fiveDaysForecast, setFiveDaysForecast] = useState([
        { temp: "", statue: "", icon: "" },
        { temp: "", statue: "", icon: "" },
        { temp: "", statue: "", icon: "" },
        { temp: "", statue: "", icon: "" },
        { temp: "", statue: "", icon: "" },
    ]);

    //-------------------------------------------------------------------------------------------------//
    //get APIs
    //get current location
    useEffect(() => {
        const controller = new AbortController();
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse`,
                            {
                                params: {
                                    lat: latitude,
                                    lon: longitude,
                                    format: "json",
                                },
                                headers: {
                                    "User-Agent":
                                        "YourWeatherApp/1.0 (your.email@example.com)",
                                },
                                signal: controller.signal,
                            }
                        );
                        const data = response.data;
                        const city =
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            data.address.county ||
                            data.address.state ||
                            data.address.country ||
                            "Unknown Location";
                        const country = data.address.country_code;
                        setLocation({
                            currentLocation: city,
                            currentLat: latitude,
                            currentLon: longitude,
                            currentCountry: country,
                        });
                    } catch {
                        setLocation({
                            currentLocation: "Unknown Location",
                            currentLat: latitude,
                            currentLon: longitude,
                        });
                    }
                },
                (error) => {
                    setLocation({
                        currentLocation: "Unknown Location",
                        currentLat: 31.2,
                        currentLon: 29.9,
                    });
                }
            );
        } else {
            setLocation({
                currentLocation: "Unknown Location",
                currentLat: 31.2,
                currentLon: 29.9,
            });
        }
        return () => {
            controller.abort();
        };
    }, [setLocation]);
    //get current location

    //get 5-days/3 houre weather API
    useEffect(() => {
        const controller = new AbortController();

        axios
            .get("https://api.openweathermap.org/data/2.5/forecast", {
                params: {
                    lat: location.currentLat,
                    lon: location.currentLon,
                    appid: "6c9c3b62d2d6deeb6af6cfa3d92bd664",
                    units: "metric",
                },
            })
            .then((response) => {
                let updateFiveHourForecast = response.data.list
                    .slice(0, 6)
                    .map((ele) => {
                        let date = ele.dt_txt
                            .split(" ")[0]
                            .split("-")
                            .reverse()
                            .slice(0, 2)
                            .join("-");
                        let time = ele.dt_txt
                            .split(" ")[1]
                            .split(":")
                            .slice(0, 2)
                            .join(":");
                        let temp = ele.main.temp.toFixed(0);
                        let icon = ele.weather[0].icon;
                        return { date, time, temp, icon };
                    });
                setForeCastWeather(updateFiveHourForecast);

                let fiveDaysForecast = [];
                for (let i = 0; i <= 32; i += 8) {
                    fiveDaysForecast.push(response.data.list[i]);
                }
                let fiveDaysForecastUpdate = fiveDaysForecast.map((ele) => {
                    let temp = ele.main.temp.toFixed(0);
                    let statue = ele.weather[0].main;
                    let icon = ele.weather[0].icon;
                    return { temp, statue, icon };
                });
                setFiveDaysForecast(fiveDaysForecastUpdate);
                if (updateFiveHourForecast[0].icon) {
                    setWeatherIcon((prev) => ({
                        ...prev,
                        hourOneIcon: TheSwitchWeatherIcon(
                            updateFiveHourForecast[0].icon
                        ),
                        hourTwoIcon: TheSwitchWeatherIcon(
                            updateFiveHourForecast[1].icon
                        ),
                        hourThreeIcon: TheSwitchWeatherIcon(
                            updateFiveHourForecast[2].icon
                        ),
                        hourFourIcon: TheSwitchWeatherIcon(
                            updateFiveHourForecast[3].icon
                        ),
                        hourFiveIcon: TheSwitchWeatherIcon(
                            updateFiveHourForecast[4].icon
                        ),
                        hourSixIcon: TheSwitchWeatherIcon(
                            updateFiveHourForecast[5].icon
                        ),
                    }));
                }
            })
            .catch((error) => {
                console.error(error);
            });
        return () => {
            controller.abort();
        };
    }, [location.currentLat, location.currentLon]);
    //get 5-days/3 houre weather API

    //set 5 days icon
    useEffect(() => {
        if (fiveDaysForecast[0]?.icon) {
            setWeatherIcon((prev) => ({
                ...prev,
                dayOneIcon: TheSwitchWeatherIcon(fiveDaysForecast[0].icon),
                dayTwoIcon: TheSwitchWeatherIcon(fiveDaysForecast[1].icon),
                dayThreeIcon: TheSwitchWeatherIcon(fiveDaysForecast[2].icon),
                dayFourIcon: TheSwitchWeatherIcon(fiveDaysForecast[3].icon),
                dayFiveIcon: TheSwitchWeatherIcon(fiveDaysForecast[4].icon),
            }));
        }
    }, [fiveDaysForecast]);
    //set 5 days icon

    //get current  Weather
    useEffect(() => {
        const controller = new AbortController();

        axios
            .get("https://api.openweathermap.org/data/2.5/weather", {
                params: {
                    lat: location.currentLat,
                    lon: location.currentLon,
                    appid: "6c9c3b62d2d6deeb6af6cfa3d92bd664",
                    units: "metric",
                },
                signal: controller.signal,
            })
            .then((response) => {
                let resTemp = Math.round(response.data.main.temp);
                let resMaxTemp = Math.round(response.data.main.temp_max);
                let resMinTemp = Math.round(response.data.main.temp_min);
                let resRealFeel = Math.round(response.data.main.feels_like);
                let resWind = Number(
                    (response.data.wind.speed * 3.6).toFixed(1)
                );
                let reIconCode = response.data.weather[0].icon;

                setCurrentWeather({
                    theTemp: resTemp,
                    maxTemp: resMaxTemp,
                    minTemp: resMinTemp,
                    realFeel: resRealFeel,
                    wind: resWind,
                    icon: reIconCode,
                });

                setWeatherIcon((prev) => ({
                    ...prev,
                    mainIcon: TheSwitchWeatherIcon(reIconCode),
                }));
            })
            .catch((error) => {
                console.error(error);
            });
        return () => {
            controller.abort();
        };
    }, [location.currentLat, location.currentLon]);
    //get current  Weather

    //get from Local Storage
    useEffect(() => {
        const saveTime = localStorage.getItem("TimeFormat");
        if (saveTime) {
            setTimeFormat(saveTime);
        }
        const saveWind = localStorage.getItem("WindFormat");
        if (saveWind) {
            setWindFormat(saveWind);
        }
        const saveTmep = localStorage.getItem("tempFormat");
        if (saveTmep) {
            setTempFormat(saveTmep);
        }
    }, []);
    //get from Local Storage

    //-------------------------------------------------------------------------------------------------//

    return (
        <TmepFormat.Provider value={{ tempFormat, handleTmepFormat }}>
            <WindFormat.Provider value={{ windFormat, handleWindFormat }}>
                <TimeFormat.Provider value={{ timeFormat, handleTimeFormat }}>
                    <LightDarkContext.Provider
                        value={{ darkTheme, handleDarkLightTheme }}
                    >
                        <div
                            className="App"
                            style={{
                                minHeight: "100vh",
                            }}
                            data-theme={darkTheme ? "dark" : "light"}
                        >
                            <Grid
                                container
                                spacing={2}
                                style={{ minHeight: "100vh" }}
                            >
                                <Grid
                                    item
                                    size={{ xs: 12, sm: 12, md: 2, lg: 1 }}
                                >
                                    <NavBar />
                                </Grid>
                                <Grid
                                    item
                                    size={{ xs: 12, sm: 12, md: 10, lg: 11 }}
                                >
                                    <Grid size={12}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                gap: "20px",
                                                padding: "6px",
                                            }}
                                            className="searchBar"
                                        >
                                            <Grid
                                                item
                                                size={{
                                                    xs: 9,
                                                    sm: 9,
                                                    md: 9,
                                                    lg: 7,
                                                }}
                                            >
                                                <div style={{ flex: "1" }}>
                                                    <SearchBar
                                                        setLocation={
                                                            setLocation
                                                        }
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                size={{
                                                    xs: 3,
                                                    sm: 3,
                                                    md: 3,
                                                    lg: 5,
                                                }}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "right",
                                                    paddingRight: "10px",
                                                }}
                                            >
                                                <ToggleTheme />
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid size={12}>
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={
                                                    <Weather
                                                        location={location}
                                                        setLocation={
                                                            setLocation
                                                        }
                                                        currentWeather={
                                                            currentWeather
                                                        }
                                                        foreCastWeather={
                                                            foreCastWeather
                                                        }
                                                        weatherIcon={
                                                            weatherIcon
                                                        }
                                                        fiveDaysForecast={
                                                            fiveDaysForecast
                                                        }
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/map"
                                                element={
                                                    <Map location={location} />
                                                }
                                            />
                                            {/* <Route path="/settings" element={<Settings />} /> */}
                                        </Routes>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </LightDarkContext.Provider>
                </TimeFormat.Provider>
            </WindFormat.Provider>
        </TmepFormat.Provider>
    );
}

export default App;
