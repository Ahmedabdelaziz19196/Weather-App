const SunnyIcon = ({ style = {} }) => {
    return (
        <svg
            style={style}
            viewBox="-15 -15 30 30"
            xmlns="http://www.w3.org/2000/svg"
        >
            <style type="text/css">
                {`
                    @keyframes am-weather-sun {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    .am-weather-sun {
                        animation-name: am-weather-sun;
                        animation-duration: 9s;
                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                    }
                `}
            </style>

            <g className="am-weather-sun">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <g key={deg} transform={`rotate(${deg})`}>
                        <line
                            transform="translate(0,10)"
                            y2="4"
                            fill="none"
                            stroke="#ffa500"
                            strokeLinecap="round"
                            strokeWidth="2"
                        />
                    </g>
                ))}
                <circle
                    r="6.5"
                    fill="#ffa500"
                    stroke="#ffa500"
                    strokeWidth="2"
                />
            </g>
        </svg>
    );
};

export default SunnyIcon;
