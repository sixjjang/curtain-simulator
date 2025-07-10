import React, { useState, ChangeEvent, FormEvent } from "react";

// 예시 컬러 리스트 (실제는 API 연동 예정)
const colorList = [
  { name: "아이보리", code: "101-IVO", hex: "#f6f3e9" },
  { name: "로즈핑크", code: "302-RPK", hex: "#e09ca5" },
  { name: "미다참곡", code: "203-MGY", hex: "#9e9e9e" },
  { name: "미니스티", code: "504-LKK", hex: "#b6b8a0" },
];

interface Product {
  name: string;
  curtainType: "겉커튼" | "속커튼" | "블라인드";
  pleatType: "민자" | "나비";
  blackoutRate: number; // %
  isBlackout: boolean;
  textureFile?: File;
  texturePreview?: string;
}

const ProductRegister: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    curtainType: "겉커튼",
    pleatType: "민자",
    blackoutRate: 0,
    isBlackout: false,
    textureFile: undefined,
    texturePreview: undefined,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "blackoutRate"
          ? Math.min(100, Math.max(0, Number(value)))
          : value,
    }));
  };

  const handleTextureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProduct((prev) => ({
        ...prev,
        textureFile: file,
        texturePreview: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  // 암막 여부 자동 계산
  const updateBlackout = (rate: number) => {
    setProduct((prev) => ({
      ...prev,
      blackoutRate: rate,
      isBlackout: rate >= 70,
    }));
  };

  const handleBlackoutRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rate = Math.min(100, Math.max(0, Number(e.target.value)));
    updateBlackout(rate);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: 서버 전송 혹은 상태 저장 로직 추가
    alert(`제품 등록 완료: ${product.name} (${product.isBlackout ? "암막" : "비암막"})`);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: "28rem",
      margin: "0 auto",
      padding: "1rem",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      backgroundColor: "white"
    }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>
        📦 제품 등록
      </h2>

      <div>
        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>
          제품명
        </label>
        <input
          name="name"
          value={product.name}
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
          커튼 타입
        </label>
        <select
          name="curtainType"
          value={product.curtainType}
          onChange={handleChange}
          style={{
            width: "100%",
            border: "1px solid #d1d5db",
            padding: "0.5rem",
            borderRadius: "4px",
            fontSize: "0.875rem"
          }}
        >
          <option value="겉커튼">겉커튼</option>
          <option value="속커튼">속커튼</option>
          <option value="블라인드">블라인드</option>
        </select>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>
          주름 형태
        </label>
        <select
          name="pleatType"
          value={product.pleatType}
          onChange={handleChange}
          style={{
            width: "100%",
            border: "1px solid #d1d5db",
            padding: "0.5rem",
            borderRadius: "4px",
            fontSize: "0.875rem"
          }}
        >
          <option value="민자">민자</option>
          <option value="나비">나비</option>
        </select>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>
          암막율 (%)
        </label>
        <input
          type="number"
          name="blackoutRate"
          value={product.blackoutRate}
          onChange={handleBlackoutRateChange}
          min={0}
          max={100}
          style={{
            width: "100%",
            border: "1px solid #d1d5db",
            padding: "0.5rem",
            borderRadius: "4px",
            fontSize: "0.875rem"
          }}
        />
        <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: "#6b7280" }}>
          암막율이 70% 이상이면 암막 제품으로 자동 분류됩니다.
        </p>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>
          텍스처 이미지 업로드
        </label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleTextureChange}
          style={{ fontSize: "0.875rem" }}
        />
        {product.texturePreview && (
          <img 
            src={product.texturePreview} 
            alt="텍스처 미리보기" 
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

export default ProductRegister; 