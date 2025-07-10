import React from "react";
import { sampleCurtains, CurtainSample } from "../data/sampleCurtains";

interface Props {
  selected?: CurtainSample | null;
  onSelect: (product: CurtainSample) => void;
}

const ProductSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
        커튼스타일
      </label>
      <select
        value={selected ? selected.name : ""}
        onChange={e => {
          const product = sampleCurtains.find(p => p.name === e.target.value);
          if (product) onSelect(product);
        }}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          borderRadius: 6,
          border: "1px solid #d1d5db",
          fontSize: "1rem",
          background: "#f9fafb",
          marginBottom: 0
        }}
      >
        <option value="">제품을 선택하세요</option>
        {sampleCurtains.filter(product => product.type === '겉커튼' || product.type === '속커튼').map(product => (
          <option key={product.name} value={product.name}>
            {product.name} ({product.type})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelector; 