import "./NavBar.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import TuneIcon from "@mui/icons-material/Tune";

import { useState } from "react";
import { useContext } from "react";
import { LightDarkContext } from "../Context/LightDarkContext";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { TimeFormat, TmepFormat } from "../Context/Formats";
import { WindFormat } from "../Context/Formats";

export default function Settings() {
    let { darkTheme } = useContext(LightDarkContext);

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    let { timeFormat, handleTimeFormat } = useContext(TimeFormat);
    let { windFormat, handleWindFormat } = useContext(WindFormat);
    let { tempFormat, handleTmepFormat } = useContext(TmepFormat);

    function handleChangingTime(e) {
        handleTimeFormat(e.target.value);
    }
    function handleChangingWind(e) {
        handleWindFormat(e.target.value);
    }
    function handleChangingTemp(e) {
        handleTmepFormat(e.target.value);
    }
    const DrawerList = (
        <Box
            sx={{ width: 350 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            className="the-list"
        >
            <div
                className="format"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p>Time Format</p>
                <ToggleButtonGroup
                    value={timeFormat}
                    exclusive
                    onChange={handleChangingTime}
                    aria-label="Platform"
                    sx={{
                        "& .MuiToggleButton-root": {
                            color: darkTheme
                                ? "var(--color-dark)"
                                : "var(--color-light)",
                            borderColor: darkTheme
                                ? "var(--color-dark)"
                                : "var(--color-light)",
                            "&:hover": {
                                background: darkTheme
                                    ? "var(--main-dark-background)"
                                    : "var(--main-light-background)",
                                color: "white",
                            },
                            "&.Mui-selected": {
                                backgroundColor: "#1976d2",
                                color: "white",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#42a5f5",
                            },
                        },
                    }}
                >
                    <ToggleButton value="12h">12H</ToggleButton>
                    <ToggleButton value="24h">24H</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div
                className="format"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p>Temperature Format</p>
                <ToggleButtonGroup
                    value={tempFormat}
                    exclusive
                    onChange={handleChangingTemp}
                    aria-label="Platform"
                    sx={{
                        "& .MuiToggleButton-root": {
                            color: darkTheme
                                ? "var(--color-dark)"
                                : "var(--color-light)",
                            borderColor: darkTheme
                                ? "var(--color-dark)"
                                : "var(--color-light)",
                            "&:hover": {
                                background: darkTheme
                                    ? "var(--main-dark-background)"
                                    : "var(--main-light-background)",
                                color: "white",
                            },
                            "&.Mui-selected": {
                                backgroundColor: "#1976d2",
                                color: "white",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#42a5f5",
                            },
                        },
                    }}
                >
                    <ToggleButton value="celsius">°C</ToggleButton>
                    <ToggleButton value="fahrenheit">°F</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div
                className="format"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p>Wind Speed</p>
                <ToggleButtonGroup
                    value={windFormat}
                    exclusive
                    onChange={handleChangingWind}
                    aria-label="Platform"
                    sx={{
                        "& .MuiToggleButton-root": {
                            color: darkTheme
                                ? "var(--color-dark)"
                                : "var(--color-light)",
                            borderColor: darkTheme
                                ? "var(--color-dark)"
                                : "var(--color-light)",
                            "&:hover": {
                                background: darkTheme
                                    ? "var(--main-dark-background)"
                                    : "var(--main-light-background)",
                                color: "white",
                            },
                            "&.Mui-selected": {
                                backgroundColor: "#1976d2",
                                color: "white",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#42a5f5",
                            },
                        },
                    }}
                >
                    <ToggleButton value="km/h">km/h</ToggleButton>
                    <ToggleButton value="kts">kts</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </Box>
    );

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="nav-icon"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={toggleDrawer(true)}
            >
                <TuneIcon sx={{ height: 40, width: 40 }} className="the-icon" />
                <p
                    className="nav-text-two"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    Settings
                </p>
            </div>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        padding: "20px",
                        backgroundColor: darkTheme
                            ? "var(--secondry-dark-background)"
                            : "var(--secondry-light-background)",
                        color: darkTheme
                            ? "var(--color-dark)"
                            : "var(--color-light)",
                    },
                }}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}
