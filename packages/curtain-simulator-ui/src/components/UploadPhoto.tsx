import React, { useRef } from "react";

interface UploadPhotoProps {
  onUpload: (photoDataUrl: string) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed:", e.target.files);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      console.log("File read successfully");
      onUpload(reader.result as string);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("UploadPhoto button clicked");
    
    if (inputRef.current) {
      console.log("Triggering file input click");
      inputRef.current.click();
    } else {
      console.error("File input ref is null");
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "none",
        border: "none",
        boxShadow: "none",
        padding: 0,
        position: "relative",
        zIndex: 10
      }}
      onClick={handleContainerClick}
    >
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
          transition: "background 0.2s",
          position: "relative",
          zIndex: 11,
          userSelect: "none"
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#047857"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#059669"}
        type="button"
      >
        사진 선택하기
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ 
          display: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "pointer"
        }}
      />
    </div>
  );
};

export default UploadPhoto; 