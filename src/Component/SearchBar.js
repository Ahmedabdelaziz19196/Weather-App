import "./SearchBar.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect, useContext } from "react";
import { LightDarkContext } from "../Context/LightDarkContext";
import { debounce } from "lodash";
import axios from "axios";

export default function SearchBar({ setLocation }) {
    const { darkTheme } = useContext(LightDarkContext);

    const [cities, setCities] = useState([]);

    const [inputValue, setInputValue] = useState("");

    const apiKey = "6c9c3b62d2d6deeb6af6cfa3d92bd664";

    const debouncedSearch = debounce(async (query) => {
        if (query.length > 2) {
            try {
                const response = await axios.get(
                    "https://api.openweathermap.org/data/2.5/find",
                    {
                        params: {
                            q: query,
                            appid: apiKey,
                            units: "metric",
                        },
                    }
                );

                const data = response.data;

                if (data.list) {
                    setCities(
                        data.list.map((item) => ({
                            city: item.name,
                            country: item.sys.country,
                            lat: item.coord.lat,
                            lon: item.coord.lon,
                        }))
                    );
                } else {
                    setCities([]);
                }
            } catch (error) {
                console.error("Error fetching cities with axios:", error);
                setCities([]);
            }
        } else {
            setCities([]);
        }
    }, 500);

    useEffect(() => {
        debouncedSearch(inputValue);
        return () => debouncedSearch.cancel();
    }, [inputValue, debouncedSearch]);

    return (
        <div>
            <Autocomplete
                id="city-select-demo"
                sx={{ width: "100%" }}
                options={cities}
                autoHighlight
                getOptionLabel={(option) => option.city}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={(event, newValue) => {
                    if (newValue) {
                        setLocation({
                            currentLocation: newValue.city,
                            currentCountry: newValue.country,
                            currentLat: newValue.lat,
                            currentLon: newValue.lon,
                        });
                    }
                }}
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <Box
                            key={key}
                            component="li"
                            sx={{
                                "& > img": { mr: 2, flexShrink: 0 },
                                backgroundColor: darkTheme
                                    ? "#333333"
                                    : "#ffffff",
                                color: darkTheme ? "black" : "#000000",
                                "&:hover": {
                                    backgroundColor: darkTheme
                                        ? "#555555"
                                        : "#d0d0d0",
                                    color: darkTheme ? "black" : "#000000",
                                },
                            }}
                            {...optionProps}
                        >
                            {option.city} ({option.country})
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        className="Search-textfeild"
                        sx={{
                            background: darkTheme
                                ? "var(--secondry-dark-background)"
                                : "var(--secondry-light-background)",
                            "& .MuiInputLabel-root": {
                                color: darkTheme ? "#ffffff" : "#000000",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: darkTheme ? "#ffffff" : "#000000",
                            },
                            input: {
                                color: darkTheme
                                    ? "var(--color-dark)"
                                    : "var(--color-light)",
                            },
                            borderRadius: "10px",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "transparent",
                                },
                                "&:hover fieldset": {
                                    borderColor: "transparent",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "transparent",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: darkTheme
                                        ? "var(--color-dark)"
                                        : "var(--color-light)",
                                },
                            },
                        }}
                        {...params}
                        label="Search a city"
                        slotProps={{
                            htmlInput: {
                                ...params.inputProps,
                                autoComplete: "new-password",
                            },
                        }}
                    />
                )}
            />
        </div>
    );
}
