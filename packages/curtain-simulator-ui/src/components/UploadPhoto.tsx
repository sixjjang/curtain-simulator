import React, { useRef } from "react";

interface UploadPhotoProps {
  onUpload: (photoDataUrl: string) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "none",
      border: "none",
      boxShadow: "none",
      padding: 0
    }}>
      <button
        onClick={handleClick}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#059669",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: "500",
          boxShadow: "0 2px 8px rgba(80,60,30,0.08)",
          transition: "background 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#047857"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#059669"}
      >
        사진 선택하기
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadPhoto; 