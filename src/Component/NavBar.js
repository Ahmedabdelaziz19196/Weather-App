import "./NavBar.css";
import { useContext } from "react";
import { LightDarkContext } from "../Context/LightDarkContext";
import { Link } from "react-router-dom";

//MUI
import Stack from "@mui/material/Stack";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import MapIcon from "@mui/icons-material/Map";
import MosqueIcon from "@mui/icons-material/Mosque";
export default function NavBar() {
    let { darkTheme } = useContext(LightDarkContext);

    return (
        <div
            className="nav-bar"
            data-theme={darkTheme ? "dark" : "light"}
            style={{
                paddingTop: "20px",
                textAlign: "center",
            }}
        >
            <Stack
                sx={{
                    alignItems: "center",
                    position: "sticky",
                    top: 20,
                }}
                className="theNavIcons"
            >
                <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <div>
                        <img
                            src={
                                darkTheme
                                    ? require("../img/lightlogo.png")
                                    : require("../img/darklogo.png")
                            }
                            alt="logo"
                            className="logo"
                            style={{ marginBottom: "20px" }}
                        />
                    </div>
                </Link>
                <Link
                    to="/"
                    className="nav-icon"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <WbSunnyIcon
                        sx={{ height: 40, width: 40 }}
                        className="the-icon"
                    />
                    <p style={{ fontSize: "14px" }} className="nav-text">
                        Weathers
                    </p>
                </Link>

                <Link
                    to="/map"
                    className="nav-icon"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <MapIcon
                        sx={{ height: 40, width: 40 }}
                        className="the-icon"
                    />
                    <p style={{ fontSize: "14px" }} className="nav-text">
                        Map
                    </p>
                </Link>

                <Link
                    to="/athan"
                    className="nav-icon"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <MosqueIcon
                        sx={{ height: 40, width: 40 }}
                        className="the-icon"
                    />
                    <p style={{ fontSize: "14px" }} className="nav-text">
                        Athan
                    </p>
                </Link>
            </Stack>
        </div>
    );
}
