// ThunderNight.jsx
import React from "react";

const ThunderNight = ({ style = {} }) => {
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

                <style>
                    {`
                    @keyframes am-weather-cloud-3 {
                        0% { transform: translate(-5px, 0px); }
                        50% { transform: translate(10px, 0px); }
                        100% { transform: translate(-5px, 0px); }
                    }

                    .am-weather-cloud-3 {
                        animation: am-weather-cloud-3 7s linear infinite;
                    }

                    @keyframes am-weather-stroke {
                        0%, 4%, 8%, 12%, 16%, 20%, 24%, 28%, 40%, 100% {
                            transform: translate(0, 0);
                        }
                        2%, 10%, 14%, 18% {
                            transform: translate(0.3px, 0px);
                        }
                        6% {
                            transform: translate(0.5px, 0.4px);
                        }
                        22% {
                            transform: translate(1px, 0px);
                        }
                        26% {
                            transform: translate(-1px, 0px);
                        }
                        65% {
                            transform: translate(-1px, 5px);
                            fill: white;
                        }
                        61% {
                            fill: orange;
                        }
                    }

                    .am-weather-stroke {
                        animation: am-weather-stroke 1.11s linear infinite;
                    }
                    `}
                </style>
            </defs>

            <g transform="translate(-20,-25)" filter="url(#blur)">
                {/* الهلال والنجوم */}
                <g transform="matrix(.8 0 0 .8 16 4)">
                    <polygon
                        className="am-weather-moon-star-1"
                        points="3.3 1.5 4 2.7 5.2 3.3 4 4 3.3 5.2 2.7 4 1.5 3.3 2.7 2.7"
                        fill="#ffa500"
                    />
                    <polygon
                        className="am-weather-moon-star-2"
                        transform="translate(20,10)"
                        points="3.3 1.5 4 2.7 5.2 3.3 4 4 3.3 5.2 2.7 4 1.5 3.3 2.7 2.7"
                        fill="#ffa500"
                    />
                    <path
                        className="am-weather-moon"
                        d="M14.5 13.2c0-3.7 2-6.9 5-8.7-1.5-0.9-3.2-1.3-5-1.3-5.5 0-10 4.5-10 10s4.5 10 10 10c1.8 0 3.5-0.5 5-1.3-3-1.7-5-5-5-8.7z"
                        fill="#ffa500"
                        stroke="#ffa500"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                </g>

                {/* السحابة */}
                <g className="am-weather-cloud-3">
                    <path
                        transform="translate(-20,-11)"
                        d="M47.7 35.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9 0.2-2.8 0.5-0.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 0.8 0.2 1.6 0.4 2.3-0.3-0.1-0.7-0.1-1-0.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-0.5 7.9-4 7.9-8.4z"
                        fill="#57a0ee"
                        stroke="#fff"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                    />
                </g>

                {/* البرق */}
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

export default ThunderNight;
