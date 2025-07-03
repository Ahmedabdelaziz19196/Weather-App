const FewCloudsNight = ({ style = {} }) => {
    return (
        <svg
            viewBox="-30 -30 90 90"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", margin: "0 auto", ...style }}
        >
            <defs>
                <filter
                    id="blur"
                    x="-.20655"
                    y="-.28472"
                    width="1.403"
                    height="1.6944"
                >
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA slope="0.05" type="linear" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <style type="text/css">
                    {`
                        @keyframes am-weather-cloud-2 {
                          0% { transform: translate(0px, 0px); }
                          50% { transform: translate(2px, 0px); }
                          100% { transform: translate(0px, 0px); }
                        }
                        .am-weather-cloud-2 {
                          animation: am-weather-cloud-2 3s linear infinite;
                        }

                        @keyframes am-weather-moon {
                          0% { transform: rotate(0deg); }
                          50% { transform: rotate(15deg); }
                          100% { transform: rotate(0deg); }
                        }
                        .am-weather-moon {
                          animation: am-weather-moon 6s linear infinite;
                          transform-origin: 12.5px 15.15px;
                        }

                        @keyframes am-weather-moon-star-1 {
                          0% { opacity: 0; }
                          100% { opacity: 1; }
                        }
                        .am-weather-moon-star-1 {
                          animation: am-weather-moon-star-1 5s linear 3s forwards;
                        }

                        @keyframes am-weather-moon-star-2 {
                          0% { opacity: 0; }
                          100% { opacity: 1; }
                        }
                        .am-weather-moon-star-2 {
                          animation: am-weather-moon-star-2 4s linear 5s forwards;
                        }
                    `}
                </style>
            </defs>

            <g filter="url(#blur)" transform="translate(0, 0) scale(2)">
                {/* النجوم */}
                <g className="am-weather-moon-star-1">
                    <polygon
                        points="1.5 3.3 2.7 2.7 3.3 1.5 4 2.7 5.2 3.3 4 4 3.3 5.2 2.7 4"
                        fill="#ffa500"
                        transform="translate(15,-10)"
                    />
                </g>
                <g
                    className="am-weather-moon-star-2"
                    transform="translate(20,0)"
                >
                    <polygon
                        points="1.5 3.3 2.7 2.7 3.3 1.5 4 2.7 5.2 3.3 4 4 3.3 5.2 2.7 4"
                        fill="#ffa500"
                    />
                </g>

                {/* القمر */}
                <g className="am-weather-moon">
                    <path
                        transform="translate(-15,-10)"
                        d="m14.5 13.2c0-3.7 2-6.9 5-8.7-1.5-0.9-3.2-1.3-5-1.3-5.5 0-10 4.5-10 10s4.5 10 10 10c1.8 0 3.5-0.5 5-1.3-3-1.7-5-5-5-8.7z"
                        fill="#ffa500"
                        stroke="#ffa500"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                </g>

                {/* السحاب */}
                <g className="am-weather-cloud-2">
                    <path
                        transform="translate(-25,-23)"
                        d="m47.7 35.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9 0.2-2.8 0.5-0.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 0.8 0.2 1.6 0.4 2.3-0.3-0.1-0.7-0.1-1-0.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-0.5 7.9-4 7.9-8.4z"
                        fill="#c6deff"
                        stroke="#fff"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </svg>
    );
};

export default FewCloudsNight;
