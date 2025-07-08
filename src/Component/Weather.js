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
import { TimeFormat, TmepFormat } from "../Context/Formats";
import { WindFormat } from "../Context/Formats";

//moment library
import moment from "moment/moment";

export default function Weather({
    location,
    setLocation,
    currentWeather,
    foreCastWeather,
    weatherIcon,
    fiveDaysForecast,
}) {
    let { darkTheme } = useContext(LightDarkContext);
    let { timeFormat } = useContext(TimeFormat);
    let { windFormat } = useContext(WindFormat);
    let { tempFormat } = useContext(TmepFormat);

    let theTime = [];
    function changeTimeFormat() {
        for (let index = 0; index < foreCastWeather.length; index++) {
            let theHour = Number(foreCastWeather[index].time.split(":")[0]);
            console.log(theHour);
            if (timeFormat === "24h") {
                theTime.push(foreCastWeather[index].time);
            }
            if (timeFormat === "12h") {
                if (theHour === 12) {
                    theTime.push(`12 PM`);
                } else if (theHour === 0) {
                    theTime.push(`12 AM`);
                } else if (theHour > 12) {
                    let editTime = theHour - 12;
                    theTime.push(`0${editTime} PM`);
                } else {
                    theTime.push(`0${theHour} AM`);
                }
            }
        }
    }
    changeTimeFormat();
    const convertTemp = (temp) => {
        return tempFormat === "celsius"
            ? temp
            : Math.round((temp * 9) / 5 + 32);
    };
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
                                            {convertTemp(
                                                currentWeather.theTemp
                                            )}
                                            {tempFormat === "celsius"
                                                ? "°C"
                                                : "°F"}{" "}
                                        </h1>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginBottom: "10px",
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
                                                <p>{theTime[0]}</p>
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
                                                    {convertTemp(
                                                        foreCastWeather[0].temp
                                                    )}
                                                    {tempFormat === "celsius"
                                                        ? "°C"
                                                        : "°F"}
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
                                                <p>{theTime[1]}</p>
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
                                                    {convertTemp(
                                                        foreCastWeather[1].temp
                                                    )}
                                                    {tempFormat === "celsius"
                                                        ? "°C"
                                                        : "°F"}
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
                                                <p>{theTime[2]}</p>
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
                                                    <p>
                                                        {convertTemp(
                                                            foreCastWeather[2]
                                                                .temp
                                                        )}
                                                        {tempFormat ===
                                                        "celsius"
                                                            ? "°C"
                                                            : "°F"}
                                                    </p>{" "}
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
                                                <p>{theTime[3]}</p>
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
                                                    <p>
                                                        {convertTemp(
                                                            foreCastWeather[3]
                                                                .temp
                                                        )}
                                                        {tempFormat ===
                                                        "celsius"
                                                            ? "°C"
                                                            : "°F"}
                                                    </p>{" "}
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
                                                <p>{theTime[4]}</p>
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
                                                    <p>
                                                        {convertTemp(
                                                            foreCastWeather[4]
                                                                .temp
                                                        )}
                                                        {tempFormat ===
                                                        "celsius"
                                                            ? "°C"
                                                            : "°F"}
                                                    </p>{" "}
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
                                                <p>{theTime[5]}</p>
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
                                                    <p>
                                                        {convertTemp(
                                                            foreCastWeather[5]
                                                                .temp
                                                        )}
                                                        {tempFormat ===
                                                        "celsius"
                                                            ? "°C"
                                                            : "°F"}
                                                    </p>
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
                                                    {convertTemp(
                                                        currentWeather.realFeel
                                                    )}
                                                    {tempFormat === "celsius"
                                                        ? "°C"
                                                        : "°F"}
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
                                                    {windFormat === "km/h"
                                                        ? `${currentWeather.wind} km/h`
                                                        : `${(
                                                              currentWeather.wind /
                                                              1.852
                                                          ).toFixed(1)} knots`}
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
                                                    {convertTemp(
                                                        currentWeather.minTemp
                                                    )}
                                                    {tempFormat === "celsius"
                                                        ? "°C"
                                                        : "°F"}
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
                                                    {convertTemp(
                                                        currentWeather.minTemp
                                                    )}
                                                    {tempFormat === "celsius"
                                                        ? "°C"
                                                        : "°F"}
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
                            5-days forecast
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
                                        <p>
                                            {convertTemp(
                                                fiveDaysForecast[0].temp
                                            )}
                                            {tempFormat === "celsius"
                                                ? "°C"
                                                : "°F"}
                                        </p>
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
                                            <p>
                                                {convertTemp(
                                                    fiveDaysForecast[1].temp
                                                )}
                                                {tempFormat === "celsius"
                                                    ? "°C"
                                                    : "°F"}
                                            </p>{" "}
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
                                            <p>
                                                {convertTemp(
                                                    fiveDaysForecast[2].temp
                                                )}
                                                {tempFormat === "celsius"
                                                    ? "°C"
                                                    : "°F"}
                                            </p>{" "}
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
                                        {weatherIcon.dayFourIcon}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <p>{fiveDaysForecast[3].statue}</p>
                                            <p>
                                                {convertTemp(
                                                    fiveDaysForecast[3].temp
                                                )}
                                                {tempFormat === "celsius"
                                                    ? "°C"
                                                    : "°F"}
                                            </p>{" "}
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
                                        {weatherIcon.dayFiveIcon}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <p>{fiveDaysForecast[4].statue}</p>
                                            <p>
                                                {convertTemp(
                                                    fiveDaysForecast[4].temp
                                                )}
                                                {tempFormat === "celsius"
                                                    ? "°C"
                                                    : "°F"}
                                            </p>
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
