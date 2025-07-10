import React from "react";

interface LightControlProps {
  mode: 'day' | 'cloudy' | 'night';
  onChange: (mode: 'day' | 'cloudy' | 'night') => void;
}

const LightControl: React.FC<LightControlProps> = ({ mode, onChange }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
    }}>
      <span style={{ 
        fontSize: "0.875rem", 
        fontWeight: "600" 
      }}>
        💡 조명:
      </span>
      <button
        style={{
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          backgroundColor: mode === 'day' ? '#fef3c7' : '#e5e7eb',
          fontWeight: mode === 'day' ? 'bold' : 'normal',
          color: mode === 'day' ? '#92400e' : '#374151'
        }}
        onClick={() => onChange('day')}
      >
        ☀️ 낮
      </button>
      <button
        style={{
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          backgroundColor: mode === 'cloudy' ? '#fef3c7' : '#e5e7eb',
          fontWeight: mode === 'cloudy' ? 'bold' : 'normal',
          color: mode === 'cloudy' ? '#92400e' : '#374151'
        }}
        onClick={() => onChange('cloudy')}
      >
        ⛅ 흐림
      </button>
      <button
        style={{
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          backgroundColor: mode === 'night' ? '#1f2937' : '#e5e7eb',
          fontWeight: mode === 'night' ? 'bold' : 'normal',
          color: mode === 'night' ? '#f9fafb' : '#374151'
        }}
        onClick={() => onChange('night')}
      >
        🌙 밤
      </button>
    </div>
  );
};

export default LightControl; 