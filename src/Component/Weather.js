import "./Weather.css";
// import SearchBar from "./SearchBar";
// import ToggleTheme from "./ToggleTheme";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { LightDarkContext } from "../Context/LightDarkContext";

//Weather Icon
import SunnyIcon from "../Weather Icon/SunnyIcon";

//Weather Icon

import React, { useEffect, useState } from "react";
import TheSwitchWeatherIcon from "../Functions/TheSwitchWeatherIcon";
//axios library
import axios from "axios";

export default function Weather() {
    let { darkTheme } = useContext(LightDarkContext);

    const [location, setLocation] = useState({
        currentLocation: "",
        currentLat: "",
        currentLon: "",
    });

    //current weather
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
    });

    //-------------------------------------------------------------------------------------------------//
    //get APIs
    //get current location
    useEffect(() => {
        const controller = new AbortController();
        axios
            .get("http://ip-api.com/json", {
                signal: controller.signal,
            })
            .then((response) => {
                let data = response;
                setLocation({
                    currentLocation: data.data.city,
                    currentLat: data.data.lat,
                    currentLon: data.data.lon,
                });
            })
            .catch((Error) => {
                console.error(Error);
            });
        return () => {
            controller.abort();
        };
    }, []);
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
                signal: controller.signal,
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

    //get current  Weather
    useEffect(() => {
        const controller = new AbortController();

        axios
            .get("https://api.openweathermap.org/data/2.5/weather", {
                params: {
                    lat: location.currentLat,
                    lon: location.currentLon,
                    appid: "6c9c3b62d2d6deeb6af6cfa3d92bd664",
                },
                signal: controller.signal,
            })
            .then((response) => {
                let resTemp = Math.round(response.data.main.temp - 273.15);
                let resMaxTemp = Math.round(
                    response.data.main.temp_max - 273.15
                );
                let resMinTemp = Math.round(
                    response.data.main.temp_min - 273.15
                );
                let resRealFeel = Math.round(
                    response.data.main.feels_like - 273.15
                );
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
    //-------------------------------------------------------------------------------------------------//

    return (
        <div style={{ padding: "10px  10px 10px 10px" }}>
            <Grid container spacing={2} sx={{ height: "calc(100vh - )" }}>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 7 }}>
                    <Stack spacing={2}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "calc(100vh - 96px))",
                                gap: "20px",
                            }}
                        >
                            <div
                                className="weather-area"
                                style={{
                                    background: darkTheme
                                        ? "var(--secondry-dark-background)"
                                        : "var(--secondry-light-background)",
                                    color: darkTheme
                                        ? "var(--color-dark)"
                                        : "var(--color-light)",
                                    width: "100%",
                                    borderRadius: "10px",
                                    padding: "10px 20px",
                                }}
                            >
                                <div
                                    className="main-weather"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderBottom: `1px solid ${
                                            darkTheme
                                                ? "var(--main-dark-background)"
                                                : "var(--main-light-background)"
                                        }`,
                                        marginBottom: "10px",
                                    }}
                                >
                                    {/* Frist section */}
                                    <div className="location">
                                        <div>
                                            <h1>{location.currentLocation}</h1>
                                        </div>
                                        <h1
                                            className="the-temp"
                                            data-temp={
                                                darkTheme ? "dark" : "light"
                                            }
                                            style={{ fontSize: "90px" }}
                                        >
                                            {currentWeather.theTemp}°
                                        </h1>
                                    </div>
                                    <div
                                        className="weather-icon"
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                        }}
                                    >
                                        {weatherIcon.mainIcon}
                                    </div>
                                </div>

                                {/* Second section */}

                                <div>
                                    <p
                                        style={{
                                            textTransform: "uppercase",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        today's forecast
                                    </p>

                                    <Grid
                                        container
                                        spacing={0}
                                        className="forecast-grid"
                                        data-forcastTheme={
                                            darkTheme ? "dark" : "light"
                                        }
                                    >
                                        <Grid
                                            item
                                            size={{
                                                xs: 12,
                                                sm: 12,
                                                md: 4,
                                                lg: 2,
                                            }}
                                        >
                                            <div className="forecast-grid-content">
                                                <p>{foreCastWeather[0].date}</p>
                                                <p>{foreCastWeather[0].time}</p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                        }}
                                                    >
                                                        {
                                                            weatherIcon.hourOneIcon
                                                        }
                                                    </div>
                                                </div>

                                                <p>
                                                    {foreCastWeather[0].temp}°
                                                </p>
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            size={{
                                                xs: 12,
                                                sm: 12,
                                                md: 4,
                                                lg: 2,
                                            }}
                                        >
                                            <div className="forecast-grid-content">
                                                <p>{foreCastWeather[1].date}</p>
                                                <p>{foreCastWeather[1].time}</p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                        }}
                                                    >
                                                        {
                                                            weatherIcon.hourTwoIcon
                                                        }
                                                    </div>
                                                </div>
                                                <p>
                                                    {foreCastWeather[1].temp}°
                                                </p>
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            size={{
                                                xs: 12,
                                                sm: 12,
                                                md: 4,
                                                lg: 2,
                                            }}
                                        >
                                            <div className="forecast-grid-content">
                                                <p>{foreCastWeather[2].date}</p>
                                                <p>{foreCastWeather[2].time}</p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                        }}
                                                    >
                                                        {
                                                            weatherIcon.hourThreeIcon
                                                        }
                                                    </div>
                                                </div>
                                                <p>
                                                    {foreCastWeather[2].temp}°
                                                </p>
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            size={{
                                                xs: 12,
                                                sm: 12,
                                                md: 4,
                                                lg: 2,
                                            }}
                                        >
                                            <div className="forecast-grid-content">
                                                <p>{foreCastWeather[3].date}</p>
                                                <p>{foreCastWeather[3].time}</p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                        }}
                                                    >
                                                        {
                                                            weatherIcon.hourFourIcon
                                                        }
                                                    </div>
                                                </div>
                                                <p>
                                                    {foreCastWeather[3].temp}°
                                                </p>
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            size={{
                                                xs: 12,
                                                sm: 12,
                                                md: 4,
                                                lg: 2,
                                            }}
                                        >
                                            <div className="forecast-grid-content">
                                                <p>{foreCastWeather[4].date}</p>
                                                <p>{foreCastWeather[4].time}</p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                        }}
                                                    >
                                                        {
                                                            weatherIcon.hourFiveIcon
                                                        }
                                                    </div>
                                                </div>
                                                <p>
                                                    {foreCastWeather[4].temp}°
                                                </p>
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            size={{
                                                xs: 12,
                                                sm: 12,
                                                md: 4,
                                                lg: 2,
                                            }}
                                        >
                                            <div className="forecast-grid-content">
                                                <p>{foreCastWeather[5].date}</p>
                                                <p>{foreCastWeather[5].time}</p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                        }}
                                                    >
                                                        {
                                                            weatherIcon.hourSixIcon
                                                        }
                                                    </div>
                                                </div>
                                                <p>
                                                    {foreCastWeather[5].temp}°
                                                </p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>

                            <div
                                className="weather-area"
                                style={{
                                    background: darkTheme
                                        ? "var(--secondry-dark-background)"
                                        : "var(--secondry-light-background)",
                                    color: darkTheme
                                        ? "var(--color-dark)"
                                        : "var(--color-light)",
                                    width: "100%",
                                    height: "100px",
                                    borderRadius: "10px",
                                    padding: "10px 20px",
                                    flex: "1",
                                }}
                            >
                                <p
                                    style={{
                                        textTransform: "uppercase",
                                        marginBottom: "20px",
                                    }}
                                >
                                    air conditions
                                </p>
                                <Grid
                                    data-airCondition={
                                        darkTheme ? "dark" : "light"
                                    }
                                    className="airCondition"
                                    container
                                    spacing={2}
                                >
                                    <Grid
                                        className="airConditionDetails"
                                        item
                                        size={{
                                            xs: 12,
                                            sm: 12,
                                            md: 12,
                                            lg: 6,
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ThermostatIcon
                                                    style={{
                                                        fontSize: "40px",
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        fontSize: "20px",
                                                        margin: "0 8px",
                                                    }}
                                                >
                                                    Real Feel
                                                </p>
                                            </div>
                                            <div>
                                                <h2
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    {currentWeather.realFeel}°
                                                </h2>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid
                                        className="airConditionDetails"
                                        item
                                        size={{
                                            xs: 12,
                                            sm: 12,
                                            md: 12,
                                            lg: 6,
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <AirOutlinedIcon
                                                    style={{
                                                        fontSize: "40px",
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        fontSize: "20px",
                                                        margin: "0 8px",
                                                    }}
                                                >
                                                    Wind
                                                </p>
                                            </div>
                                            <div>
                                                <h2
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    {currentWeather.wind} Km/h
                                                </h2>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid
                                        className="airConditionDetails"
                                        item
                                        size={{
                                            xs: 12,
                                            sm: 12,
                                            md: 12,
                                            lg: 6,
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <RemoveIcon
                                                    style={{
                                                        fontSize: "40px",
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        fontSize: "20px",
                                                        margin: "0 8px",
                                                    }}
                                                >
                                                    Low Temperature
                                                </p>
                                            </div>
                                            <div>
                                                <h2
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    {currentWeather.minTemp}°
                                                </h2>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid
                                        className="airConditionDetails"
                                        item
                                        size={{
                                            xs: 12,
                                            sm: 12,
                                            md: 12,
                                            lg: 6,
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <AddIcon
                                                    style={{
                                                        fontSize: "40px",
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        fontSize: "20px",
                                                        margin: "0 8px",
                                                    }}
                                                >
                                                    High Temperature
                                                </p>
                                            </div>
                                            <div>
                                                <h2
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    {currentWeather.minTemp}°
                                                </h2>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Stack>
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 5 }}>
                    <div
                        style={{
                            background: darkTheme
                                ? "var(--secondry-dark-background)"
                                : "var(--secondry-light-background)",
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                            padding: "20px",
                        }}
                    >
                        <p
                            style={{
                                textTransform: "uppercase",
                                marginBottom: "10px",
                            }}
                        >
                            5-day forecast
                        </p>
                        <div
                            className="todayForecast"
                            data-forcastTheme={darkTheme ? "dark" : "light"}
                            style={{
                                height: "calc(100% - 40px)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                className="days-details"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <p>Today</p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <SunnyIcon
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    />
                                    <p>Sunny</p>
                                </div>
                                <p>01-July</p>
                            </div>
                            <div
                                className="days-details"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <p>Sun</p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <SunnyIcon
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    />
                                    <p>Sunny</p>
                                </div>
                                <p>01-July</p>
                            </div>
                            <div
                                className="days-details"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <p>Mon</p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <SunnyIcon
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    />
                                    <p>Sunny</p>
                                </div>
                                <p>01-July</p>
                            </div>
                            <div
                                className="days-details"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <p>Tue</p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <SunnyIcon
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    />
                                    <p>Sunny</p>
                                </div>
                                <p>01-July</p>
                            </div>
                            <div
                                className="days-details"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <p>Wed</p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <SunnyIcon
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    />
                                    <p>Sunny</p>
                                </div>
                                <p>01-July</p>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
