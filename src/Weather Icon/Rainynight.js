const RainyNight = ({ style = {} }) => {
    return (
        <svg
            style={style}
            viewBox="-30 -30 60 60"
            xmlns="http://www.w3.org/2000/svg"
        >
            <style>
                {`
                @keyframes am-weather-moon {
                    0% { transform: rotate(0deg); }
                    50% { transform: rotate(15deg); }
                    100% { transform: rotate(0deg); }
                }

                @keyframes am-weather-moon-star {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                @keyframes am-weather-cloud-2 {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(2px, 0); }
                }

                @keyframes am-weather-rain {
                    0% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -100; }
                }

                .moon {
                    animation: am-weather-moon 6s linear infinite;
                    transform-origin: 0px 0px;
                }

                .moon-star-1 {
                    animation: am-weather-moon-star 5s linear 3s 1;
                }

                .moon-star-2 {
                    animation: am-weather-moon-star 4s linear 5s 1;
                }

                .cloud {
                    animation: am-weather-cloud-2 3s linear infinite;
                }

                .rain-1 {
                    animation: am-weather-rain 8s linear infinite;
                }

                .rain-2 {
                    animation: am-weather-rain 8s linear infinite;
                    animation-delay: 0.25s;
                }
            `}
            </style>

            <g transform="translate(-5, -5)">
                {/* 🌙 القمر */}
                <g className="moon" transform="translate(0, 0)">
                    <path
                        d="M14.5 13.2c0-3.7 2-6.9 5-8.7-1.5-0.9-3.2-1.3-5-1.3-5.5 0-10 4.5-10 10s4.5 10 10 10c1.8 0 3.5-0.5 5-1.3-3-1.7-5-5-5-8.7z"
                        fill="#ffa500"
                        stroke="#ffa500"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        transform="translate(-12.5, -15.15)"
                    />
                    <polygon
                        className="moon-star-1"
                        points="4 4 3.3 5.2 2.7 4 1.5 3.3 2.7 2.7 3.3 1.5 4 2.7 5.2 3.3"
                        fill="#ffa500"
                        transform="translate(-8, -11)"
                    />
                    <polygon
                        className="moon-star-2"
                        points="4 4 3.3 5.2 2.7 4 1.5 3.3 2.7 2.7 3.3 1.5 4 2.7 5.2 3.3"
                        fill="#ffa500"
                        transform="translate(8, -1)"
                    />
                </g>
            </g>

            {/* ☁️ السحابة */}
            <g className="cloud" transform="translate(-20, 5)">
                <path
                    d="M47.7 35.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9 0.2-2.8 0.5-0.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 0.8 0.2 1.6 0.4 2.3-0.3-0.1-0.7-0.1-1-0.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-0.5 7.9-4 7.9-8.4z"
                    fill="#57a0ee"
                    transform="translate(-30, -30)"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="1.2"
                />
            </g>

            {/* 🌧️ المطر */}
            <g transform="translate(-5, 15) rotate(10)">
                <line
                    className="rain-1"
                    transform="translate(-4,1)"
                    y2="8"
                    stroke="#91c0f8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4,4"
                    fill="none"
                />
                <line
                    className="rain-2"
                    transform="translate(0,-1)"
                    y2="8"
                    stroke="#91c0f8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4,4"
                    fill="none"
                />
                <line
                    className="rain-1"
                    transform="translate(4,0)"
                    y2="8"
                    stroke="#91c0f8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4,4"
                    fill="none"
                />
            </g>
        </svg>
    );
};

export default RainyNight;
