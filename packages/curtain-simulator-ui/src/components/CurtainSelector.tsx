// components/CurtainSelector.tsx
import React, { useState } from "react";

type ProductType = "겉커튼" | "속커튼" | "블라인드";
type CurtainState = "닫힘" | "반개방" | "열림";

interface Product {
  id: number;
  name: string;
  type: ProductType;
  isBlackout: boolean; // true = 암막
}

const dummyProducts: Product[] = [
  { id: 1, name: "루미나리 아이보리", type: "겉커튼", isBlackout: true },
  { id: 2, name: "화이트 쉬폰", type: "속커튼", isBlackout: false },
  { id: 3, name: "듀얼쉐이드 그레이", type: "블라인드", isBlackout: true },
  { id: 4, name: "인디고 린넨", type: "겉커튼", isBlackout: false },
];

const CurtainSelector = () => {
  const [selectedType, setSelectedType] = useState<ProductType>("겉커튼");
  const [showBlackoutOnly, setShowBlackoutOnly] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const filteredProducts = dummyProducts.filter(
    (p) => p.type === selectedType && (!showBlackoutOnly || p.isBlackout)
  );

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">커튼스타일</h2>

      <div className="flex gap-2 mb-2">
        {(["겉커튼", "속커튼", "블라인드"] as ProductType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1 border rounded ${
              selectedType === type ? "bg-blue-200" : ""
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={showBlackoutOnly}
          onChange={(e) => setShowBlackoutOnly(e.target.checked)}
        />
        <span className="text-sm">암막 제품만 보기</span>
      </label>

      <div className="grid grid-cols-2 gap-2">
        {filteredProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProductId(product.id)}
            className={`p-3 border rounded text-left ${
              selectedProductId === product.id ? "bg-blue-100 border-blue-300" : ""
            }`}
          >
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-gray-600">
              {product.isBlackout ? "암막" : "일반"}
            </div>
          </button>
        ))}
      </div>

      {selectedProductId && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <p className="text-sm">
            선택된 제품:{" "}
            <strong>
              {dummyProducts.find((p) => p.id === selectedProductId)?.name}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default CurtainSelector; 