import SunnyIcon from "../Weather Icon/SunnyIcon";
import MoonIcon from "../Weather Icon/MoonIcon";
import FewCloudsDay from "../Weather Icon/FewCloudsDay";
import FewCloudsNight from "../Weather Icon/FewCloudsNight";
import Cloudy from "../Weather Icon/Cloudy";
import RainyDay from "../Weather Icon/RainyDay";
import RainyNight from "../Weather Icon/RainyDay";
import ThunderDay from "../Weather Icon/ThundersDay";
import ThunderNight from "../Weather Icon/ThundersNight";
import Snow from "../Weather Icon/Snow";
import Haze from "../Weather Icon/Haze";

export default function TheSwitchWeatherIcon(icon) {
    switch (icon) {
        case "01d":
            return <SunnyIcon />;
        case "01n":
            return <MoonIcon />;
        case "02d":
        case "03d":
            return <FewCloudsDay />;
        case "02n":
        case "03n":
            return <FewCloudsNight />;
        case "04d":
        case "04n":
            return <Cloudy />;
        case "09d":
        case "10d":
            return <RainyDay />;
        case "09n":
        case "10n":
            return <RainyNight />;
        case "11d":
            return <ThunderDay />;
        case "11n":
            return <ThunderNight />;
        case "13d":
        case "13n":
            return <Snow />;
        case "50d":
        case "50n":
            return <Haze />;
        default:
            return <SunnyIcon />;
    }
}
