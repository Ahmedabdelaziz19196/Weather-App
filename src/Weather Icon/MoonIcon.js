const MoonIcon = ({ style = {} }) => {
    return (
        <svg
            style={style}
            viewBox="-20 -20 70 70"
            xmlns="http://www.w3.org/2000/svg"
        >
            <style>{`
                @keyframes am-weather-moon {
                    0% { transform: rotate(0deg); }
                    50% { transform: rotate(15deg); }
                    100% { transform: rotate(0deg); }
                }

                .am-weather-moon {
                    animation-name: am-weather-moon;
                    animation-duration: 6s;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    transform-origin: 12.5px 15.15px;
                }

                @keyframes am-weather-moon-star-1 {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                .am-weather-moon-star-1 {
                    animation: am-weather-moon-star-1 5s linear 3s 1 forwards;
                }

                @keyframes am-weather-moon-star-2 {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                .am-weather-moon-star-2 {
                    animation: am-weather-moon-star-2 4s linear 5s 1 forwards;
                }
            `}</style>

            <g transform="scale(1.5)">
                <g
                    className="am-weather-moon-star-1"
                    transform="scale(1.4) translate(-1.5, -1.5)"
                >
                    <polygon
                        points="4 2.7 5.2 3.3 4 4 3.3 5.2 2.7 4 1.5 3.3 2.7 2.7 3.3 1.5"
                        fill="#ffa500"
                        strokeWidth="1.4"
                    />
                </g>

                <g
                    className="am-weather-moon-star-2"
                    transform="translate(20,10) scale(1.4) translate(-2, -2)"
                >
                    <polygon
                        points="4 2.7 5.2 3.3 4 4 3.3 5.2 2.7 4 1.5 3.3 2.7 2.7 3.3 1.5"
                        fill="#ffa500"
                        strokeWidth="1.4"
                    />
                </g>

                <g
                    className="am-weather-moon"
                    transform="scale(1.4) translate(-2.3, -2.3)"
                >
                    <path
                        d="M14.5 13.2c0-3.7 2-6.9 5-8.7-1.5-0.9-3.2-1.3-5-1.3-5.5 0-10 4.5-10 10s4.5 10 10 10c1.8 0 3.5-0.5 5-1.3-3-1.7-5-5-5-8.7z"
                        fill="#ffa500"
                        stroke="#ffa500"
                        strokeWidth="2.5"
                    />
                </g>
            </g>
        </svg>
    );
};

export default MoonIcon;
