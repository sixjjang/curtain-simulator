import React from "react";
import BlindRenderer from "./BlindRenderer";
import CurtainRenderer from "./CurtainRenderer";

interface CurtainDisplayProps {
  backgroundImage: string;
  curtainType: "겉커튼" | "속커튼" | "블라인드";
  blindSubType?: string;
  pleatType: "민자" | "나비";
  curtainOpen: number; // 0~100
  selectedColor?: string;
  opacity?: number;
  windowRect?: { x: number; y: number; width: number; height: number };
  width?: number;
  fabricType?: "sheer" | "plain" | "blackout";
  waveDepth?: number;
  waveCount?: number;
  perspectiveAngle?: number;
  depthIntensity?: number;
  indoorLight?: number;
  sunLight?: number;
  materialType?: "plain" | "linen" | "suede" | "velvet" | "square" | "dot" | "herringbone" | "stripe" | "wave" | "tweed" | "check";
  patternScale?: number;
  patternOpacity?: number;
  patternAngle?: number;
  patternOffset?: number;
  colorLightness?: number;
  colorSaturation?: number;
  colorHue?: number;
  pleatContrast?: number;
  onCurtainClick?: () => void;
  shadowStrength?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowHeight?: number;
}

const CurtainDisplay: React.FC<CurtainDisplayProps> = ({
  backgroundImage,
  curtainType,
  blindSubType,
  pleatType,
  curtainOpen,
  selectedColor = "#FFFFFF",
  opacity = 1,
  windowRect,
  width = 100,
  fabricType = "plain",
  waveDepth = 18,
  waveCount = 10,
  perspectiveAngle = 5,
  depthIntensity = 1,
  indoorLight,
  sunLight,
  materialType = "linen",
  patternScale = 4,
  patternOpacity = 0.45,
  patternAngle = 0,
  patternOffset = 0,
  colorLightness = 0,
  colorSaturation = 0,
  colorHue = 0,
  pleatContrast = 1.8,
  onCurtainClick,
  shadowStrength,
  shadowColor,
  shadowBlur,
  shadowHeight,
}) => {
  // 실내광(brightness) 필터 계산
  const indoorBrightness = indoorLight !== undefined ? 0.5 + (indoorLight / 100) : 1;
  // 자연광(자연광 레이어) opacity 계산
  const sunLayerOpacity = sunLight !== undefined ? 0.45 * (sunLight / 100) : 0;

  // 커튼 타입에 따른 투명도 기본값 설정
  const getDefaultOpacity = () => {
    if (fabricType === "blackout") return 1.0; // 겉커튼 - 100%
    if (curtainType === "속커튼") return 0.95; // 속커튼 - 95%
    return 0.95; // 기본값 - 95%
  };

  // 투명도가 명시적으로 설정되지 않은 경우 기본값 사용
  const finalOpacity = opacity !== 1 ? opacity : getDefaultOpacity();

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight: "400px",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
      border: "1px solid rgba(226, 232, 240, 0.8)"
    }}>
      {/* 배경 사진 */}
      <img
        src={backgroundImage}
        alt="업로드된 배경"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
      {/* 자연광(채광) 효과 레이어 */}
      {sunLayerOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            background: "linear-gradient(180deg, rgba(255,255,220,0.7) 0%, rgba(255,255,255,0.3) 100%)",
            opacity: sunLayerOpacity,
            zIndex: 1
          }}
        />
      )}
      {/* 커튼/블라인드 렌더링 */}
      <div 
        style={{
          position: "absolute",
          top: windowRect ? `${windowRect.y}%` : 0,
          left: windowRect ? `${windowRect.x}%` : 0,
          width: windowRect ? `${windowRect.width}%` : "100%",
          height: windowRect ? `${windowRect.height}%` : "100%",
          pointerEvents: "auto",
          opacity: finalOpacity,
          zIndex: 2,
          overflow: "hidden",
          cursor: "pointer",
          borderRadius: "4px",
          filter: `brightness(${indoorBrightness})`
        }}
        onClick={onCurtainClick}
      >
        {curtainType === "블라인드" && blindSubType ? (
          <BlindRenderer
            blindType={blindSubType}
            color={selectedColor}
            width={100}
            height={100}
            state={curtainOpen >= 66 ? "open" : curtainOpen >= 33 ? "half" : "closed"}
          />
        ) : (
          <CurtainRenderer
            pleatType={pleatType}
            curtainOpen={curtainOpen}
            color={selectedColor}
            width={100}
            fabricType={fabricType}
            waveDepth={waveDepth}
            waveCount={waveCount}
            opacity={finalOpacity}
            perspectiveAngle={perspectiveAngle}
            depthIntensity={depthIntensity}
            materialType={materialType}
            patternScale={patternScale}
            patternOpacity={patternOpacity}
            patternAngle={patternAngle}
            patternOffset={patternOffset}
            colorLightness={colorLightness}
            colorSaturation={colorSaturation}
            colorHue={colorHue}
            pleatContrast={pleatContrast}
            shadowStrength={shadowStrength}
            shadowColor={shadowColor}
            shadowBlur={shadowBlur}
            shadowHeight={shadowHeight}
          />
        )}
      </div>
      {/* 하단 그림자 (더 자연스럽게 개선) */}
      <div
        style={{
          position: 'absolute',
          left: '8%',
          right: '8%',
          bottom: '-44px',
          height: '70px',
          zIndex: 3,
          pointerEvents: 'none',
          opacity: shadowStrength ?? 0.15,
          filter: 'blur(18px)',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)'
        }}
      />
      {/* 커튼 중앙 65% 부분에 해가 들어오는 빛 효과 */}
      <div
        style={{
          position: 'absolute',
          left: '0%',
          top: '0%',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 4,
          background: 'radial-gradient(circle at 65% 50%, rgba(255,255,220,0.22) 0%, rgba(255,255,200,0.12) 18%, rgba(255,255,255,0.04) 38%, transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

export default CurtainDisplay; 