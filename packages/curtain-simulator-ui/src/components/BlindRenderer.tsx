import React from "react";

interface BlindRendererProps {
  blindType: string;
  state: "open" | "half" | "closed";
  color: string;
  width: number;
  height: number;
}

const BlindRenderer: React.FC<BlindRendererProps> = ({
  blindType,
  state,
  color,
  width,
  height
}) => {
  const getBlindStyle = () => {
    const baseStyle = {
      width: `${width}%`,
      height: `${height}%`,
      position: "absolute" as const,
      top: 0,
      left: 0,
    };

    switch (blindType) {
      case "알루미늄블라인드":
        return {
          ...baseStyle,
          background: `repeating-linear-gradient(
            0deg,
            ${color} 0px,
            ${color} 8px,
            ${adjustBrightness(color, -20)} 8px,
            ${adjustBrightness(color, -20)} 16px
          )`,
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
        };

      case "우드블라인드":
        return {
          ...baseStyle,
          background: `repeating-linear-gradient(
            0deg,
            ${color} 0px,
            ${color} 12px,
            ${adjustBrightness(color, -30)} 12px,
            ${adjustBrightness(color, -30)} 24px
          )`,
          boxShadow: "inset 0 0 15px rgba(0,0,0,0.2)",
        };

      case "콤비블라인드":
        return {
          ...baseStyle,
          background: `repeating-linear-gradient(
            0deg,
            ${color} 0px,
            ${color} 6px,
            ${adjustBrightness(color, -15)} 6px,
            ${adjustBrightness(color, -15)} 12px
          )`,
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
        };

      case "롤블라인드":
        return {
          ...baseStyle,
          background: `linear-gradient(
            180deg,
            ${adjustBrightness(color, -10)} 0%,
            ${color} 20%,
            ${color} 80%,
            ${adjustBrightness(color, -10)} 100%
          )`,
          borderRadius: "4px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        };

      case "암막롤블라인드":
        return {
          ...baseStyle,
          background: color,
          borderRadius: "4px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        };

      case "3d쉐이드":
        return {
          ...baseStyle,
          background: `repeating-linear-gradient(
            45deg,
            ${color} 0px,
            ${color} 4px,
            ${adjustBrightness(color, -25)} 4px,
            ${adjustBrightness(color, -25)} 8px
          )`,
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.15)",
        };

      case "루미넷쉐이드":
        return {
          ...baseStyle,
          background: `radial-gradient(
            circle at 50% 50%,
            ${adjustBrightness(color, 20)} 0%,
            ${color} 70%,
            ${adjustBrightness(color, -20)} 100%
          )`,
          boxShadow: "inset 0 0 15px rgba(0,0,0,0.1)",
        };

      case "허니콤쉐이드":
        return {
          ...baseStyle,
          background: `repeating-linear-gradient(
            60deg,
            ${color} 0px,
            ${color} 10px,
            ${adjustBrightness(color, -20)} 10px,
            ${adjustBrightness(color, -20)} 20px
          )`,
          boxShadow: "inset 0 0 12px rgba(0,0,0,0.1)",
        };

      case "베네시안블라인드":
        return {
          ...baseStyle,
          background: `repeating-linear-gradient(
            0deg,
            ${color} 0px,
            ${color} 15px,
            ${adjustBrightness(color, -40)} 15px,
            ${adjustBrightness(color, -40)} 30px
          )`,
          boxShadow: "inset 0 0 25px rgba(0,0,0,0.2)",
        };

      default:
        return {
          ...baseStyle,
          backgroundColor: color,
        };
    }
  };

  const getStateStyle = () => {
    switch (state) {
      case "open":
        return {
          opacity: 0.1,
          transform: "translateY(-80%)",
        };
      case "half":
        return {
          opacity: 0.6,
          transform: "translateY(-40%)",
        };
      case "closed":
        return {
          opacity: 1,
          transform: "translateY(0%)",
        };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        ...getBlindStyle(),
        ...getStateStyle(),
        transition: "all 0.3s ease-in-out",
      }}
    />
  );
};

// 색상 밝기 조절 함수
const adjustBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return "#" + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
};

export default BlindRenderer; 