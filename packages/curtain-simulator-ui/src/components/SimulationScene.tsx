import React from "react";
import CurtainDisplay from "./CurtainDisplay";
import { CurtainSample } from "../data/sampleCurtains";
import { Color } from "../data/colorPalette";

interface SimulationSceneProps {
  photo: string;
  windowArea: { x: number; y: number; width: number; height: number };
  selectedProducts: CurtainSample[];
  curtainOpen: number; // 0~100
  selectedColor?: Color | null;
  curtainWidth?: number;
  waveDepth?: number;
  waveCount?: number;
  curtainOpacity?: number;
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

const SimulationScene: React.FC<SimulationSceneProps> = ({
  photo,
  windowArea,
  selectedProducts,
  curtainOpen,
  selectedColor,
  curtainWidth = 100,
  waveDepth = 18,
  waveCount = 10,
  curtainOpacity = 0.85,
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
  const getPleatType = () => {
    if (selectedProducts.length === 0) return "민자" as const;
    return selectedProducts[0].pleat;
  };

  const getCurtainType = () => {
    if (selectedProducts.length === 0) return "겉커튼" as const;
    return selectedProducts[0].type;
  };

  const getBlindSubType = () => {
    if (selectedProducts.length === 0) return undefined;
    return selectedProducts[0].subType;
  };

  const getSelectedColorHex = () => {
    return selectedColor?.hex || "#FFFFFF";
  };

  // 원단 종류 판별
  const getFabricType = () => {
    if (selectedProducts.length === 0) return "plain";
    const p = selectedProducts[0];
    if (p.type === "속커튼") return "sheer";
    if (p.type === "겉커튼") return "blackout";
    return "plain";
  };

  // 커튼 타입에 따른 투명도 기본값 설정
  const getDefaultOpacity = () => {
    if (selectedProducts.length === 0) return 0.95;
    const p = selectedProducts[0];
    if (p.type === "겉커튼") return 1.0; // 겉커튼 - 100%
    if (p.type === "속커튼") return 0.95; // 속커튼 - 95%
    return 0.95; // 기본값 - 95%
  };

  // 투명도가 명시적으로 설정되지 않은 경우 기본값 사용
  const finalOpacity = curtainOpacity !== 0.85 ? curtainOpacity : getDefaultOpacity();

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight: "400px"
    }}>
      <CurtainDisplay
        backgroundImage={photo}
        curtainType={getCurtainType()}
        blindSubType={getBlindSubType()}
        pleatType={getPleatType()}
        curtainOpen={curtainOpen}
        selectedColor={getSelectedColorHex()}
        windowRect={windowArea}
        width={curtainWidth}
        fabricType={getFabricType()}
        waveDepth={waveDepth}
        waveCount={waveCount}
        opacity={finalOpacity}
        perspectiveAngle={perspectiveAngle}
        depthIntensity={depthIntensity}
        indoorLight={indoorLight}
        sunLight={sunLight}
        materialType={materialType}
        patternScale={patternScale}
        patternOpacity={patternOpacity}
        patternAngle={patternAngle}
        patternOffset={patternOffset}
        colorLightness={colorLightness}
        colorSaturation={colorSaturation}
        colorHue={colorHue}
        pleatContrast={pleatContrast}
        onCurtainClick={onCurtainClick}
        shadowStrength={shadowStrength}
        shadowColor={shadowColor}
        shadowBlur={shadowBlur}
        shadowHeight={shadowHeight}
      />
    </div>
  );
};

export default SimulationScene; 