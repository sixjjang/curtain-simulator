import React, { useState, ChangeEvent, FormEvent } from "react";

interface Color {
  name: string;
  code: string;
  hex: string;
  sampleFile?: File;
  samplePreview?: string;
}

const ColorRegister: React.FC = () => {
  const [color, setColor] = useState<Color>({
    name: "",
    code: "",
    hex: "#ffffff",
    sampleFile: undefined,
    samplePreview: undefined,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setColor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSampleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setColor((prev) => ({
        ...prev,
        sampleFile: file,
        samplePreview: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`컬러 등록 완료: ${color.name} (${color.hex})`);
    // TODO: 서버 저장 로직 추가
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "28rem",
        margin: "0 auto",
        padding: "1rem",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "white"
      }}
    >
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>
        🎨 컬러 등록
      </h2>

      <div>
        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>
          컬러명
        </label>
        <input
          type="text"
          name="name"
          value={color.name}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            border: "1px solid #d1d5db",
            padding: "0.5rem",
            borderRadius: "4px",
            fontSize: "0.875rem"
          }}
        />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>
          컬러 코드
        </label>
        <input
          type="text"
          name="code"
          value={color.code}
          onChange={handleChange}
          placeholder="예: 101-IVO"
          style={{
            width: "100%",
            border: "1px solid #d1d5db",
            padding: "0.5rem",
            borderRadius: "4px",
            fontSize: "0.875rem"
          }}
        />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>
          HEX 값
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="color"
            name="hex"
            value={color.hex}
            onChange={handleChange}
            style={{
              width: "64px",
              height: "40px",
              padding: 0,
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          />
          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            {color.hex}
          </span>
        </div>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>
          샘플 이미지 업로드
        </label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleSampleChange}
          style={{ fontSize: "0.875rem" }}
        />
        {color.samplePreview && (
          <img
            src={color.samplePreview}
            alt="샘플 미리보기"
            style={{
              marginTop: "0.5rem",
              maxHeight: "160px",
              borderRadius: "4px",
              border: "1px solid #e5e7eb"
            }}
          />
        )}
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: "500"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1d4ed8";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#2563eb";
        }}
      >
        등록하기
      </button>
    </form>
  );
};

export default ColorRegister; 