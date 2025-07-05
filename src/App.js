import { useEffect, useReducer, useState } from "react";
import "./App.css";
import NavBar from "./Component/NavBar";
import { LightDarkContext } from "./Context/LightDarkContext";
import ResutReducer from "./Reducers/ResultReducer";
import { Routes, Route } from "react-router-dom";
import Weather from "./Component/Weather";
import Map from "./Component/Map";
import Athan from "./Component/Athan";
import SearchBar from "./Component/SearchBar";
import ToggleTheme from "./Component/ToggleTheme";
//MUI
import Grid from "@mui/material/Grid";

function App() {
    // let [darkTheme, setDarkTheme] = useState(true);
    let [darkTheme, dispatch] = useReducer(ResutReducer, true);

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

    // get theme from the local storage
    useEffect(() => {
        dispatch({
            type: "getTheme",
        });
    }, []);
    // get theme from the local storage

    return (
        <LightDarkContext.Provider value={{ darkTheme, handleDarkLightTheme }}>
            <div
                className="App"
                style={{
                    minHeight: "100vh",
                }}
                data-theme={darkTheme ? "dark" : "light"}
            >
                <Grid container spacing={2} style={{ minHeight: "100vh" }}>
                    <Grid item size={{ xs: 2, sm: 2, md: 2, lg: 1 }}>
                        <NavBar />
                    </Grid>
                    <Grid item size={{ xs: 10, sm: 10, md: 10, lg: 11 }}>
                        <Grid size={12}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "20px",
                                    padding: "6px",
                                }}
                            >
                                <Grid
                                    item
                                    size={{ xs: 9, sm: 9, md: 9, lg: 7 }}
                                >
                                    <div style={{ flex: "1" }}>
                                        <SearchBar setLocation={setLocation} />
                                    </div>
                                </Grid>
                                <Grid
                                    item
                                    size={{ xs: 3, sm: 3, md: 3, lg: 5 }}
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
                                            setLocation={setLocation}
                                        />
                                    }
                                />
                                <Route path="/map" element={<Map />} />
                                <Route path="/athan" element={<Athan />} />
                            </Routes>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </LightDarkContext.Provider>
    );
}

export default App;
