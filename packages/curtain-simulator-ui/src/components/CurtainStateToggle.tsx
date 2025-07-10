import React from "react";

interface CurtainStateToggleProps {
  state: "open" | "half" | "closed";
  onChange: (state: "open" | "half" | "closed") => void;
}

const CurtainStateToggle: React.FC<CurtainStateToggleProps> = ({
  state,
  onChange,
}) => {
  return (
    <div style={{
      display: "flex",
      gap: "0.5rem",
      marginTop: "1rem",
      marginBottom: "1rem"
    }}>
      <h3 style={{ fontWeight: "bold", fontSize: "1.125rem", marginRight: "1rem" }}>
        🪟 커튼 상태
      </h3>
      <button
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          backgroundColor: state === "open" ? "#3b82f6" : "#e5e7eb",
          color: state === "open" ? "#fff" : "#374151"
        }}
        onClick={() => onChange("open")}
      >
        열림
      </button>
      <button
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          backgroundColor: state === "half" ? "#3b82f6" : "#e5e7eb",
          color: state === "half" ? "#fff" : "#374151"
        }}
        onClick={() => onChange("half")}
      >
        반개방
      </button>
      <button
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          backgroundColor: state === "closed" ? "#3b82f6" : "#e5e7eb",
          color: state === "closed" ? "#fff" : "#374151"
        }}
        onClick={() => onChange("closed")}
      >
        닫힘
      </button>
    </div>
  );
};

export default CurtainStateToggle; 