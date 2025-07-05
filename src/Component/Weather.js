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

//moment library
import moment from "moment/moment";
import { useEffect, useState } from "react";

import TheSwitchWeatherIcon from "../Functions/TheSwitchWeatherIcon";
//axios library
import axios from "axios";

export default function Weather({ location, setLocation }) {
    let { darkTheme } = useContext(LightDarkContext);

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
                        setLocation({
                            currentLocation: city,
                            currentLat: latitude,
                            currentLon: longitude,
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
                                            <p
                                                style={{
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {moment().format(
                                                    "MMMM Do YYYY"
                                                )}
                                                {"-"}
                                                {moment().format("dddd")}
                                            </p>
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
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginBott: "10px",
                                        }}
                                    >
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
                                                        border: "none",
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
                                                        border: "none",
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
                                                        border: "none",
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
                                                        border: "none",
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
                                                        border: "none",
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
                                                        border: "none",
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
                                <p>
                                    {
                                        moment()
                                            .add(1, "days")
                                            .calendar()
                                            .split(" ")[0]
                                    }
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    >
                                        {weatherIcon.dayOneIcon}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <p>{fiveDaysForecast[0].statue}</p>
                                        <p>{fiveDaysForecast[0].temp}°</p>
                                    </div>
                                </div>
                                <p>{moment().add(1, "days").format("DD-MM")}</p>
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
                                <p>
                                    {
                                        moment()
                                            .add(2, "days")
                                            .calendar()
                                            .split(" ")[0]
                                    }
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    >
                                        {weatherIcon.dayTwoIcon}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <p>{fiveDaysForecast[1].statue}</p>
                                            <p>{fiveDaysForecast[1].temp}°</p>
                                        </div>
                                    </div>
                                </div>
                                <p>{moment().add(2, "days").format("DD-MM")}</p>
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
                                <p>
                                    {
                                        moment()
                                            .add(3, "days")
                                            .calendar()
                                            .split(" ")[0]
                                    }
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    >
                                        {weatherIcon.dayThreeIcon}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <p>{fiveDaysForecast[2].statue}</p>
                                            <p>{fiveDaysForecast[2].temp}°</p>
                                        </div>
                                    </div>
                                </div>
                                <p>{moment().add(3, "days").format("DD-MM")}</p>
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
                                <p>
                                    {
                                        moment()
                                            .add(4, "days")
                                            .calendar()
                                            .split(" ")[0]
                                    }
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    >
                                        {weatherIcon.dayThreeIcon}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <p>{fiveDaysForecast[2].statue}</p>
                                            <p>{fiveDaysForecast[2].temp}°</p>
                                        </div>
                                    </div>
                                </div>
                                <p>{moment().add(4, "days").format("DD-MM")}</p>
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
                                <p>
                                    {
                                        moment()
                                            .add(5, "days")
                                            .calendar()
                                            .split(" ")[0]
                                    }
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    >
                                        {weatherIcon.dayThreeIcon}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <p>{fiveDaysForecast[2].statue}</p>
                                            <p>{fiveDaysForecast[2].temp}°</p>
                                        </div>
                                    </div>
                                </div>
                                <p>{moment().add(5, "days").format("DD-MM")}</p>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
