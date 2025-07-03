const Snow = ({ style = {} }) => (
    <svg
        style={style}
        viewBox="-30 -30 60 60"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <filter
                id="blur"
                x="-.24684"
                y="-.26897"
                width="1.4937"
                height="1.6759"
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

        @keyframes am-weather-snow {
          0% { transform: translateX(0) translateY(0); }
          33.33% { transform: translateX(-1.2px) translateY(2px); }
          66.66% { transform: translateX(1.4px) translateY(4px); opacity: 1; }
          100% { transform: translateX(-1.6px) translateY(6px); opacity: 0; }
        }

        @keyframes am-weather-snow-reverse {
          0% { transform: translateX(0) translateY(0); }
          33.33% { transform: translateX(1.2px) translateY(2px); }
          66.66% { transform: translateX(-1.4px) translateY(4px); opacity: 1; }
          100% { transform: translateX(1.6px) translateY(6px); opacity: 0; }
        }

        .am-weather-snow-1 {
          animation: am-weather-snow 2s linear infinite;
        }
        .am-weather-snow-2 {
          animation: am-weather-snow 2s linear infinite;
          animation-delay: 1.2s;
        }
        .am-weather-snow-3 {
          animation: am-weather-snow-reverse 2s linear infinite;
        }
      `}
            </style>
        </defs>
        <g transform="translate(-10,-25)" filter="url(#blur)">
            <g className="am-weather-cloud-2">
                <path
                    transform="translate(-20,-11)"
                    d="m47.7 35.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9 0.2-2.8 0.5-0.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 0.8 0.2 1.6 0.4 2.3-0.3-0.1-0.7-0.1-1-0.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-0.5 7.9-4 7.9-8.4z"
                    fill="#57a0ee"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="1.2"
                />
            </g>
            <g className="am-weather-snow-1">
                <g
                    transform="translate(3,28)"
                    fill="none"
                    stroke="#57a0ee"
                    strokeLinecap="round"
                >
                    <line
                        transform="translate(0,9)"
                        y1="-2.5"
                        y2="2.5"
                        strokeWidth="1.2"
                    />
                    <line
                        transform="rotate(45,-10.864,4.5)"
                        y1="-2.5"
                        y2="2.5"
                    />
                    <line transform="rotate(90,-4.5,4.5)" y1="-2.5" y2="2.5" />
                    <line
                        transform="rotate(135,-1.864,4.5)"
                        y1="-2.5"
                        y2="2.5"
                    />
                </g>
            </g>
            <g className="am-weather-snow-2">
                <g
                    transform="translate(11,28)"
                    fill="none"
                    stroke="#57a0ee"
                    strokeLinecap="round"
                >
                    <line
                        transform="translate(0,9)"
                        y1="-2.5"
                        y2="2.5"
                        strokeWidth="1.2"
                    />
                    <line
                        transform="rotate(45,-10.864,4.5)"
                        y1="-2.5"
                        y2="2.5"
                    />
                    <line transform="rotate(90,-4.5,4.5)" y1="-2.5" y2="2.5" />
                    <line
                        transform="rotate(135,-1.864,4.5)"
                        y1="-2.5"
                        y2="2.5"
                    />
                </g>
            </g>
            <g className="am-weather-snow-3">
                <g
                    transform="translate(20,28)"
                    fill="none"
                    stroke="#57a0ee"
                    strokeLinecap="round"
                >
                    <line
                        transform="translate(0,9)"
                        y1="-2.5"
                        y2="2.5"
                        strokeWidth="1.2"
                    />
                    <line
                        transform="rotate(45,-10.864,4.5)"
                        y1="-2.5"
                        y2="2.5"
                    />
                    <line transform="rotate(90,-4.5,4.5)" y1="-2.5" y2="2.5" />
                    <line
                        transform="rotate(135,-1.864,4.5)"
                        y1="-2.5"
                        y2="2.5"
                    />
                </g>
            </g>
        </g>
    </svg>
);

export default Snow;
