// Haze.jsx
import React from "react";

const Haze = ({ style = {} }) => (
    <svg style={style} viewBox="0 0 56 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter
                id="blur"
                x="-.20655"
                y="-.21122"
                width="1.403"
                height="1.4997"
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
        </defs>

        <style>
            {`
            @keyframes am-weather-haze-1 {
                0% { transform: translate(0px, 0px); }
                50% { transform: translate(7px, 0px); }
                100% { transform: translate(0px, 0px); }
            }
            @keyframes am-weather-haze-2 {
                0% { transform: translate(0px, 0px); }
                21.05% { transform: translate(-6px, 0px); }
                78.95% { transform: translate(9px, 0px); }
                100% { transform: translate(0px, 0px); }
            }
            @keyframes am-weather-haze-3 {
                0% { transform: translate(0px, 0px); }
                25% { transform: translate(4px, 0px); }
                75% { transform: translate(-4px, 0px); }
                100% { transform: translate(0px, 0px); }
            }
            @keyframes am-weather-haze-4 {
                0% { transform: translate(0px, 0px); }
                50% { transform: translate(-4px, 0px); }
                100% { transform: translate(0px, 0px); }
            }

            .am-weather-haze-1 {
                animation: am-weather-haze-1 8s linear infinite;
            }
            .am-weather-haze-2 {
                animation: am-weather-haze-2 20s linear infinite;
            }
            .am-weather-haze-3 {
                animation: am-weather-haze-3 6s linear infinite;
            }
            .am-weather-haze-4 {
                animation: am-weather-haze-4 6s linear infinite;
            }
            `}
        </style>

        <g transform="translate(16,-2)" filter="url(#blur)">
            <g
                className="am-weather-haze"
                transform="translate(-10,20)"
                fill="none"
                stroke="#cd9e73"
                strokeLinecap="round"
                strokeWidth="2"
            >
                <line
                    className="am-weather-haze-1"
                    y1="0"
                    y2="0"
                    x1="1"
                    x2="37"
                    strokeDasharray="3, 5, 17, 5, 7"
                />
                <line
                    className="am-weather-haze-2"
                    y1="5"
                    y2="5"
                    x1="9"
                    x2="33"
                    strokeDasharray="11, 7, 15"
                />
                <line
                    className="am-weather-haze-3"
                    y1="10"
                    y2="10"
                    x1="5"
                    x2="40"
                    strokeDasharray="11, 7, 3, 5, 9"
                />
                <line
                    className="am-weather-haze-4"
                    y1="15"
                    y2="15"
                    x1="7"
                    x2="42"
                    strokeDasharray="13, 5, 9, 5, 3"
                />
            </g>
        </g>
    </svg>
);

export default Haze;
