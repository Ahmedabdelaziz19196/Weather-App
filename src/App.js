import { useEffect, useReducer } from "react";
import "./App.css";
import NavBar from "./Component/NavBar";
import { LightDarkContext } from "./Context/LightDarkContext";
import ResutReducer from "./Reducers/ResultReducer";
import { Routes, Route } from "react-router-dom";
import Weather from "./Component/Weather";
import Map from "./Component/Map";
import Athan from "./Component/Athan";
//MUI
import Grid from "@mui/material/Grid";

function App() {
    // let [darkTheme, setDarkTheme] = useState(true);
    let [darkTheme, dispatch] = useReducer(ResutReducer, true);

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
                        <Routes>
                            <Route path="/" element={<Weather />} />
                            <Route path="/map" element={<Map />} />
                            <Route path="/athan" element={<Athan />} />
                        </Routes>
                    </Grid>
                </Grid>
            </div>
        </LightDarkContext.Provider>
    );
}

export default App;
