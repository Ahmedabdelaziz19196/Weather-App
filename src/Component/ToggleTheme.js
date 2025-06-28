import { useContext } from "react";
import { LightDarkContext } from "../Context/LightDarkContext";
import "./ToggleTheme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ToggleTheme() {
    let { darkTheme, handleDarkLightTheme } = useContext(LightDarkContext);
    function changeDarkLightTheme() {
        handleDarkLightTheme();
    }

    return (
        <div
            data-theme={darkTheme ? "dark" : "light"}
            style={{ background: "transparent" }}
        >
            <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                checked={darkTheme}
                onChange={changeDarkLightTheme}
            />
            <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
            </label>
        </div>
    );
}
