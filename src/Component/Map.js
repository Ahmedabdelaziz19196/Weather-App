import "./Map.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import TheSwitchWeatherIcon from "../Functions/TheSwitchWeatherIcon";
import { useContext } from "react";
import { LightDarkContext } from "../Context/LightDarkContext";
import { TmepFormat } from "../Context/Formats";

export default function Map({ location }) {
    let { darkTheme } = useContext(LightDarkContext);
    let { tempFormat } = useContext(TmepFormat);

    const [fiveCities, setFiveCities] = useState([
        { city: "", lat: "", lon: "" },
    ]);
    const [fiveCitiesDetails, setFiveCitiesDetails] = useState([]);
    const [weatherIcon, setWeatherIcon] = useState([]);
    //get cities' details
    useEffect(() => {
        if (
            !fiveCities.length ||
            fiveCities.some((city) => !city.lat || !city.lon)
        ) {
            return;
        }

        const controller = new AbortController();

        // Clear previous data to avoid stacking
        setFiveCitiesDetails([]);
        setWeatherIcon([]);

        fiveCities.forEach((ele) => {
            axios
                .get("https://api.openweathermap.org/data/2.5/weather", {
                    params: {
                        lat: ele.lat,
                        lon: ele.lon,
                        appid: "6c9c3b62d2d6deeb6af6cfa3d92bd664",
                        units: "metric",
                    },
                    signal: controller.signal,
                })
                .then((response) => {
                    let resTemp = Math.round(response.data.main.temp);
                    let reIconCode = response.data.weather[0].icon;
                    setFiveCitiesDetails((prev) => [
                        ...prev,
                        {
                            city: ele.city,
                            temp: resTemp,
                            icon: reIconCode,
                        },
                    ]);
                    setWeatherIcon((prev) => [
                        ...prev,
                        {
                            theIcon: TheSwitchWeatherIcon(reIconCode),
                        },
                    ]);
                })
                .catch((error) => {
                    console.error(
                        `Error fetching weather for ${ele.city}:`,
                        error
                    );
                });
        });

        return () => {
            controller.abort();
        };
    }, [fiveCities]);
    //get cities' details

    //get all countries from Countries.json file
    useEffect(() => {
        axios
            .get("/JSON/countries.json")
            .then((response) => {
                const countryData = response.data.find(
                    (ele) =>
                        ele.country.toLowerCase() ===
                        location.currentCountry.toLowerCase()
                );
                if (countryData && countryData.cities) {
                    const updateFiveCities = countryData.cities.map((ele) => ({
                        city: ele.name,
                        lat: ele.lat,
                        lon: ele.lon,
                    }));
                    setFiveCities(updateFiveCities);

                    setFiveCitiesDetails([]);
                    setWeatherIcon([]);
                } else {
                    setFiveCities([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
                setFiveCities([]);
            });
    }, [location.currentCountry]);
    // console.log(fiveCities);

    //update the map after change the location
    function MapUpdater({ center }) {
        const map = useMap();
        useEffect(() => {
            if (center[0] && center[1]) {
                map.setView(center, 13);
            }
        }, [center, map]);
        return null;
    }

    const convertTemp = (temp) => {
        return tempFormat === "celsius"
            ? temp
            : Math.round((temp * 9) / 5 + 32);
    };
    //update the map after change the location
    return (
        <div style={{ padding: "10px" }}>
            <Grid container spacing={2}>
                <Grid
                    item
                    size={{ xs: 12, sm: 12, md: 12, lg: 7 }}
                    sx={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        border: "1px solid ",
                        borderColor: darkTheme
                            ? "var(--color-dark)"
                            : "var(--color-light)",
                        zIndex: "1",
                    }}
                    className="theMap"
                >
                    {location.currentLat && location.currentLon ? (
                        <MapContainer
                            center={[
                                parseFloat(location.currentLat),
                                parseFloat(location.currentLon),
                            ]}
                            zoom={13}
                            style={{
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            />
                            <MapUpdater
                                center={[
                                    parseFloat(location.currentLat),
                                    parseFloat(location.currentLon),
                                ]}
                            />
                        </MapContainer>
                    ) : (
                        <div>Loading map...</div>
                    )}
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 5 }}>
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        {fiveCitiesDetails.length > 0 ? (
                            fiveCitiesDetails.map((ele, index) => (
                                <div
                                    style={{
                                        key: { index },
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        background: darkTheme
                                            ? "var(--secondry-dark-background)"
                                            : "var(--secondry-light-background)",
                                        color: darkTheme
                                            ? "var(--color-dark)"
                                            : "var(--color-light)",
                                        borderRadius: "10px",
                                        padding: "20px",
                                        height: "100%",
                                    }}
                                >
                                    <h2 style={{ width: "200px", flex: "1" }}>
                                        {ele.city || ""}
                                    </h2>
                                    <div
                                        style={{
                                            width: "75px",
                                            height: "75px",
                                        }}
                                    >
                                        {weatherIcon[index].theIcon || ""}
                                    </div>

                                    <h2
                                        style={{
                                            flex: "1",
                                            textAlign: "right",
                                        }}
                                    >
                                        {convertTemp(ele.temp)}
                                        {tempFormat === "celsius" ? "°C" : "°F"}
                                    </h2>
                                </div>
                            ))
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "clac(100vh - 68px)",
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
