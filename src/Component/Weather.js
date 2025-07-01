import "./Weather.css";
// import SearchBar from "./SearchBar";
// import ToggleTheme from "./ToggleTheme";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useContext } from "react";
import { LightDarkContext } from "../Context/LightDarkContext";
import SunnyIcon from "../SunnyIcon";

import React, { useEffect, useState } from "react";
//axios library
import axios from "axios";

export default function Weather() {
    let { darkTheme } = useContext(LightDarkContext);
    const [city, setCity] = useState({
        currentCity: "",
        currentLat: "",
        currentLon: "",
    });

    useEffect(() => {
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
                            }
                        );
                        const data = response.data;

                        setCity({
                            currentCity:
                                data.address.city ||
                                data.address.town ||
                                data.address.village ||
                                data.address.county ||
                                "Unknown",
                            currentLat: latitude,
                            currentLon: longitude,
                        });
                    } catch (err) {
                        console.error(err);
                    }
                },
                (error) => {
                    console.error("Geolocation error", error);
                }
            );
        }
    }, []);

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
                                            <h1>{city.currentCity}</h1>
                                            <p
                                                style={{
                                                    fontSize: "15px",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                chance of rains: 0%
                                            </p>
                                        </div>
                                        <h1
                                            className="the-temp"
                                            data-temp={
                                                darkTheme ? "dark" : "light"
                                            }
                                            style={{ fontSize: "90px" }}
                                        >
                                            25°
                                        </h1>
                                    </div>
                                    <div className="weather-icon">
                                        <SunnyIcon
                                            style={{
                                                width: "200px",
                                                height: "200px",
                                            }}
                                        />
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
                                                <p>6:00 AM</p>
                                                <SunnyIcon
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                    }}
                                                />
                                                <p>25°</p>
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
                                                <p>6:00 AM</p>
                                                <SunnyIcon
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                    }}
                                                />
                                                <p>25°</p>
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
                                                <p>6:00 AM</p>
                                                <SunnyIcon
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                    }}
                                                />
                                                <p>25°</p>
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
                                                <p>6:00 AM</p>
                                                <SunnyIcon
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                    }}
                                                />
                                                <p>25°</p>
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
                                                <p>6:00 AM</p>
                                                <SunnyIcon
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                    }}
                                                />
                                                <p>25°</p>
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
                                                <p>6:00 AM</p>
                                                <SunnyIcon
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                    }}
                                                />
                                                <p>25°</p>
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
                                        size={{ xs: 12, sm: 12, md: 12, lg: 6 }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ThermostatIcon
                                                    style={{ fontSize: "40px" }}
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
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    25°
                                                </h2>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid
                                        className="airConditionDetails"
                                        item
                                        size={{ xs: 12, sm: 12, md: 12, lg: 6 }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <WaterDropOutlinedIcon
                                                    style={{ fontSize: "40px" }}
                                                />
                                                <p
                                                    style={{
                                                        fontSize: "20px",
                                                        margin: "0 8px",
                                                    }}
                                                >
                                                    Chance Of rain
                                                </p>
                                            </div>
                                            <div>
                                                <h2
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    0%
                                                </h2>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid
                                        className="airConditionDetails"
                                        item
                                        size={{ xs: 12, sm: 12, md: 12, lg: 6 }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <AirOutlinedIcon
                                                    style={{ fontSize: "40px" }}
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
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    0.2 Km/h
                                                </h2>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid
                                        className="airConditionDetails"
                                        item
                                        size={{ xs: 12, sm: 12, md: 12, lg: 6 }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <WbSunnyOutlinedIcon
                                                    style={{ fontSize: "40px" }}
                                                />
                                                <p
                                                    style={{
                                                        fontSize: "20px",
                                                        margin: "0 8px",
                                                    }}
                                                >
                                                    UV Inside
                                                </p>
                                            </div>
                                            <div>
                                                <h2
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    3
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
                            7-day forecast
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
                                <p>Sat</p>
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
                                <p>Thu</p>
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
                                <p>Fri</p>
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
