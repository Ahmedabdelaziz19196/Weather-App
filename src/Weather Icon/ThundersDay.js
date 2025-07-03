const ThunderDay = ({ style = {} }) => {
    return (
        <svg
            style={style}
            viewBox="-30 -30 60 60"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter
                    id="blur"
                    x="-.20655"
                    y="-.1975"
                    width="1.403"
                    s
                    height="1.4766"
                >
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.05" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <style>{`
          @keyframes am-weather-cloud-3 {
            0% { transform: translate(-5px, 0px); }
            50% { transform: translate(10px, 0px); }
            100% { transform: translate(-5px, 0px); }
          }

          .am-weather-cloud-3 {
            animation: am-weather-cloud-3 7s linear infinite;
          }

          @keyframes am-weather-sun {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .am-weather-sun {
            animation: am-weather-sun 9s linear infinite;
          }

          @keyframes am-weather-stroke {
            0%, 4%, 8%, 12%, 16%, 20%, 24%, 28%, 100% { transform: translate(0, 0); }
            2%, 10%, 14%, 18% { transform: translate(0.3px, 0); }
            6% { transform: translate(0.5px, 0.4px); }
            22% { transform: translate(1px, 0); }
            26% { transform: translate(-1px, 0); }
            40% { fill: orange; }
            61% { fill: orange; }
            65% { fill: white; transform: translate(-1px, 5px); }
          }

          .am-weather-stroke {
            animation: am-weather-stroke 1.11s linear infinite;
          }
        `}</style>
            </defs>

            <g id="thunder" transform="translate(-10,-25)" filter="url(#blur)">
                <g transform="translate(0,16)">
                    <g className="am-weather-sun">
                        <line
                            transform="translate(0,9)"
                            y2="3"
                            stroke="#ffa500"
                            strokeLinecap="round"
                            strokeWidth="2"
                        />
                        {[45, 90, 135, 225, -90, -45].map((angle, i) => (
                            <g key={i} transform={`rotate(${angle})`}>
                                <line
                                    transform="translate(0,9)"
                                    y2="3"
                                    stroke="#ffa500"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                />
                            </g>
                        ))}
                        <g transform="scale(-1)">
                            <line
                                transform="translate(0,9)"
                                y2="3"
                                stroke="#ffa500"
                                strokeLinecap="round"
                                strokeWidth="2"
                            />
                        </g>
                        <circle
                            r="5"
                            fill="#ffa500"
                            stroke="#ffa500"
                            strokeWidth="2"
                        />
                    </g>
                </g>

                <g className="am-weather-cloud-3">
                    <path
                        transform="translate(-20,-11)"
                        d="M47.7 35.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9 0.2-2.8 0.5-0.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 0.8 0.2 1.6 0.4 2.3-0.3-0.1-0.7-0.1-1-0.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-0.5 7.9-4 7.9-8.4z"
                        fill="#57a0ee"
                        stroke="#fff"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                    />
                </g>

                <g
                    className="am-weather-lightning"
                    transform="matrix(1.2,0,0,1.2,-4,28)"
                >
                    <polygon
                        className="am-weather-stroke"
                        points="11.1 6.9 14.3 -2.9 20.5 -2.9 16.4 4.3 20.3 4.3 11.5 14.6 14.9 6.9"
                        fill="#ffa500"
                        stroke="#fff"
                    />
                </g>
            </g>
        </svg>
    );
};

export default ThunderDay;
