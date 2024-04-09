import React from "react";

class FishObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fishPosition: { x: props.x, y: props.y }
    };
  }

  render() {
    const { x, y, size } = this.props;

    const fishStyle = {
      fill: `url(#fishGradient-${x}-${y})`, // Rainbow gradient or lavender color
      stroke: "#000000", // Black stroke
      strokeWidth: 2,
    };

    const eyeStyle = {
      fill: "#000000", // Black color
    };

    return (
      <g transform={`translate(${x},${y})`}>
        {/* Fish body */}
        <path
          d={`M ${-size / 2} 0 Q ${-size / 4} ${-size / 4} 0 0 Q ${size / 4} ${-size / 4} ${size / 2} 0 Q ${size / 4} ${size / 4} 0 0 Q ${-size / 4} ${size / 4} ${-size / 2} 0 Z`}
          style={fishStyle}
        />
        {/* Fish eye */}
        <circle cx={size / 4} cy={-size / 10} r={size / 20} style={eyeStyle} />
        {/* Define the fish body gradient */}
        <defs>
          {/* Rainbow gradient */}
          <linearGradient id={`fishGradient-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
            <stop offset="20%" style={{ stopColor: "#FFA500", stopOpacity: 1 }} />
            <stop offset="40%" style={{ stopColor: "#FFFF00", stopOpacity: 1 }} />
            <stop offset="60%" style={{ stopColor: "#00FF00", stopOpacity: 1 }} />
            <stop offset="80%" style={{ stopColor: "#0000FF", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#800080", stopOpacity: 1 }} />
          </linearGradient>
          {/* Lavender color */}
          {/* <linearGradient id={`fishGradient-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#E6E6FA", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#9370DB", stopOpacity: 1 }} />
          </linearGradient> */}
        </defs>
      </g>
    );
  }
}

export default FishObject;
