import React, { useState, useRef, useEffect } from "react";
import colorPalette, { Color } from "../data/colorPalette";

interface ColorSelectorProps {
  selectedColor: Color | null;
  onColorSelect: (color: Color) => void;
  hideLabel?: boolean;
}

// HEX 색상에서 밝기(명도) 계산 함수
function getBrightness(hex: string): number {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  // perceived brightness 공식
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// 밝은 순서로 정렬
const sortedColors = [...colorPalette].sort((a, b) => getBrightness(b.hex) - getBrightness(a.hex));

const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedColor, onColorSelect, hideLabel }) => {
  // 기본값: 0.5(최저)~1.5(최고) 중 0.5 + (1.5-0.5)*0.07 = 0.57 (밝게 쪽으로 7% 이동)
  const [colorDetail, setColorDetail] = useState(0.57);
  const [baseColor, setBaseColor] = useState<Color | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // ResizeObserver로 부모 width 감지
  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    const observer = new (window as any).ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // width에 따라 gridCols, dotSize, padding, gridGap 계산
  let gridCols = 10, colorDotSize = 64, palettePadding = '36px 24px 32px 24px', gridGap = 18;
  if (containerWidth < 400) {
    gridCols = 3; colorDotSize = 40; palettePadding = '10px 4px 8px 4px'; gridGap = 6;
  } else if (containerWidth < 600) {
    gridCols = 5; colorDotSize = 44; palettePadding = '18px 8px 16px 8px'; gridGap = 8;
  } else if (containerWidth < 900) {
    gridCols = 7; colorDotSize = 52; palettePadding = '28px 16px 24px 16px'; gridGap = 12;
  }
  // gridGap을 컬럼/행 모두에 동일하게 적용
  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: `${gridGap}px`,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
  };

  // HEX 색상 밝기 보정 함수
  function adjustColor(hex: string, factor: number) {
    let c = hex.replace("#", "");
    let r = parseInt(c.substring(0, 2), 16);
    let g = parseInt(c.substring(2, 4), 16);
    let b = parseInt(c.substring(4, 6), 16);
    r = Math.round(Math.min(255, Math.max(0, r * factor)));
    g = Math.round(Math.min(255, Math.max(0, g * factor)));
    b = Math.round(Math.min(255, Math.max(0, b * factor)));
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  // 실제 적용할 컬러
  const displayColor = baseColor ? adjustColor(baseColor.hex, colorDetail) : (selectedColor ? selectedColor.hex : "#fff");

  return (
    <div ref={containerRef} style={{ marginBottom: "1rem", position: "relative", width: "100%", minWidth: 0, maxWidth: "100%" }}>
      {!hideLabel && (
        <label style={{ fontWeight: 600, display: "block", marginBottom: 2 }}>
          색상 선택
        </label>
      )}
      {/* 투명 배경의 팔레트 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
          minWidth: 0,
          maxWidth: '100%',
          padding: palettePadding,
          margin: '0.5rem 0',
          transition: 'all 0.4s cubic-bezier(.4,2,.6,1)',
          zIndex: 10,
        }}
        tabIndex={0}
        aria-label="컬러 팔레트"
      >
        <div
          style={gridStyle}
        >
          {sortedColors.map((color) => (
            <button
              key={color.hex}
              onClick={() => {
                setColorDetail(0.57);
                setBaseColor(color);
                onColorSelect(color);
              }}
              onMouseEnter={() => setHovered(color.hex)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(color.hex)}
              onBlur={() => setHovered(null)}
              style={{
                width: colorDotSize,
                height: colorDotSize,
                borderRadius: '50%',
                border: selectedColor?.hex === color.hex ? '3px solid var(--color-primary)' : '2px solid var(--color-border)',
                background: color.hex,
                boxShadow: selectedColor?.hex === color.hex
                  ? '0 3px 12px rgba(191,174,158,0.25)'
                  : hovered === color.hex
                    ? '0 4px 16px rgba(59,130,246,0.18)'
                    : '0 2px 6px rgba(0,0,0,0.08)',
                transform: hovered === color.hex ? 'scale(1.12)' : 'scale(1)',
                zIndex: hovered === color.hex ? 2 : 1,
                cursor: 'pointer',
                outline: 'none',
                transition: 'border 0.2s, box-shadow 0.2s, transform 0.15s',
                padding: 0,
                margin: 0,
                justifySelf: 'center'
              }}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>
      {(baseColor || selectedColor) && (
        <>
          {/* 디테일 조절 슬라이더 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>어둡게</span>
            <input
              type="range"
              min={0.5}
              max={1.5}
              step={0.01}
              value={colorDetail}
              onChange={e => {
                const val = Number(e.target.value);
                setColorDetail(val);
                if (baseColor) {
                  onColorSelect({ ...baseColor, hex: adjustColor(baseColor.hex, val) });
                } else if (selectedColor) {
                  onColorSelect({ ...selectedColor, hex: adjustColor(selectedColor.hex, val) });
                }
              }}
              style={{ flex: 1 }}
            />
            <span style={{ fontSize: 13, color: "#6b7280" }}>밝게</span>
          </div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                display: "inline-block",
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: displayColor,
                border: "1px solid #d1d5db"
              }}
            />
            <span style={{ fontWeight: 500 }}>{baseColor?.name ?? selectedColor?.name}</span>
            <span style={{ color: "#6b7280", fontSize: 12 }}>{displayColor}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorSelector; 