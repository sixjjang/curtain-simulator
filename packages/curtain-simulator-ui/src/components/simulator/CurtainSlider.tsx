import React, { useState } from "react";

interface CurtainSliderProps {
  onStateChange: (state: "open" | "half" | "closed") => void;
}

const CurtainSlider: React.FC<CurtainSliderProps> = ({ onStateChange }) => {
  const [value, setValue] = useState(50); // 초기값 반개방

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setValue(val);

    if (val < 33) onStateChange("open");
    else if (val < 66) onStateChange("half");
    else onStateChange("closed");
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label style={{
        display: "block",
        fontSize: "0.875rem",
        fontWeight: "600",
        marginBottom: "0.25rem"
      }}>
        커튼 개방 정도
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        style={{
          width: "100%",
          height: "6px",
          borderRadius: "3px",
          background: "#e5e7eb",
          outline: "none",
          cursor: "pointer"
        }}
      />
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.75rem",
        marginTop: "0.25rem",
        color: "#6b7280"
      }}>
        <span>열림</span>
        <span>반개방</span>
        <span>닫힘</span>
      </div>
    </div>
  );
};

export default CurtainSlider; 