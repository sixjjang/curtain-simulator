import React from "react";

interface CurtainRendererProps {
  pleatType: "민자" | "나비";
  curtainOpen: number; // 0~100
  color: string;
  width: number;
  waveCount?: number;
  waveDepth?: number;
  opacity?: number;
  fabricType?: "sheer" | "plain" | "blackout";
  perspectiveAngle?: number;
  depthIntensity?: number;
  materialType?: "plain" | "linen" | "suede" | "velvet" | "square" | "dot" | "herringbone" | "stripe" | "wave" | "tweed" | "check";
  patternScale?: number;
  patternOpacity?: number;
  patternAngle?: number;
  patternOffset?: number;
  colorLightness?: number;
  colorSaturation?: number;
  colorHue?: number;
  pleatContrast?: number;
  shadowStrength?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowHeight?: number;
}

const CurtainRenderer: React.FC<CurtainRendererProps> = ({
  pleatType,
  curtainOpen,
  color,
  width,
  waveCount = 10,
  waveDepth = 18,
  opacity = 0.95,
  fabricType = "plain",
  perspectiveAngle = 5,
  depthIntensity = 1,
  materialType = "linen",
  patternScale = 4,
  patternOpacity = 0.45,
  patternAngle = 0,
  patternOffset = 0,
  colorLightness = 0,
  colorSaturation = 0,
  colorHue = 0,
  pleatContrast = 1.8,
  shadowStrength = 0.83,
  shadowColor = '#000000',
  shadowBlur = 5,
  shadowHeight = 16,
}) => {
  // 색상 조정을 실제로 적용
  const adjustedColor = React.useMemo(() => {
    let adjusted = color;
    if (colorHue !== 0) {
      adjusted = adjustHue(adjusted, colorHue);
    }
    if (colorSaturation !== 0) {
      adjusted = adjustSaturation(adjusted, colorSaturation);
    }
    if (colorLightness !== 0) {
      adjusted = adjustBrightness(adjusted, colorLightness);
    }
    return adjusted;
  }, [color, colorHue, colorSaturation, colorLightness]);

  const linenPatternId = `linenTexture_${patternScale}_${patternOpacity}_${patternAngle}_${patternOffset}_${colorLightness}_${colorSaturation}_${colorHue}`;
  
  // 모든 패턴 ID를 동적으로 생성
  const suedePatternId = `suedeTexture_${patternScale}_${patternOpacity}_${patternAngle}_${patternOffset}_${colorLightness}_${colorSaturation}_${colorHue}`;
  const squarePatternId = `squarePattern_${patternScale}_${patternOpacity}_${patternAngle}_${patternOffset}_${colorLightness}_${colorSaturation}_${colorHue}`;
  const dotPatternId = `dotPattern_${patternScale}_${patternOpacity}_${patternAngle}_${patternOffset}_${colorLightness}_${colorSaturation}_${colorHue}`;
  const herringbonePatternId = `herringbonePattern_${patternScale}_${patternOpacity}_${patternAngle}_${patternOffset}_${colorLightness}_${colorSaturation}_${colorHue}`;
  const stripePatternId = `stripePattern_${patternScale}_${patternOpacity}_${patternAngle}_${patternOffset}_${colorLightness}_${colorSaturation}_${colorHue}`;
  const wavePatternId = `wavePattern_${patternScale}_${patternOpacity}_${patternAngle}_${patternOffset}_${colorLightness}_${colorSaturation}_${colorHue}`;
  const tweedPatternId = `tweedPattern_${patternScale}_${patternOpacity}_${patternAngle}_${patternOffset}_${colorLightness}_${colorSaturation}_${colorHue}`;
  const checkPatternId = `checkPattern_${patternScale}_${patternOpacity}_${patternAngle}_${patternOffset}_${colorLightness}_${colorSaturation}_${colorHue}`;

  // 상단이 자연스럽게 눌린 곡선 생성 (상단 8~10%는 일자, 그 아래부터 웨이브)
  const getWavePath = (layer: number = 0) => {
    const w = 100;
    const h = 100; // 고정 높이
    const count = waveCount;
    const depth = waveDepth * depthIntensity;
    const layerOffset = layer * 2 * depthIntensity;
    const topFlat = 0; // 상단 평평한 부분 제거
    let d = `M0,${topFlat} `;
    for (let i = 0; i < count; i++) {
      const x1 = (w / count) * i;
      const x2 = (w / count) * (i + 0.5);
      const x3 = (w / count) * (i + 1);
      const y1 = topFlat;
      const waveEase = 0.5 + 0.5 * Math.sin(Math.PI * ((x1 + x3) / (2 * w)));
      let y2 = topFlat + (pleatType === "나비"
        ? (i % 2 === 0 ? depth * 1.2 : depth * 0.7)
        : depth) * waveEase;
      y2 += layerOffset;
      d += `Q${x2},${y2} ${x3},${y1} `;
    }
    d += `V${h} H0 Z`;
    return d;
  };

  // 상단이 자연스럽게 눌린 그림자 웨이브
  const getShadowWavePath = () => {
    const w = 100;
    const h = 100; // 고정 높이
    const count = waveCount;
    const depth = waveDepth * 1.7 * depthIntensity;
    const topFlat = 0; // 상단 평평한 부분 제거
    let d = `M0,${topFlat} `;
    for (let i = 0; i < count; i++) {
      const x1 = (w / count) * i;
      const x2 = (w / count) * (i + 0.5);
      const x3 = (w / count) * (i + 1);
      const y1 = topFlat;
      const waveEase = 0.5 + 0.5 * Math.sin(Math.PI * ((x1 + x3) / (2 * w)));
      const y2 = pleatType === "나비"
        ? (i % 2 === 0 ? depth * 1.2 : depth * 1.1)
        : (i % 2 === 0 ? depth : depth * 1.1);
      d += `Q${x2},${y1 + y2 * waveEase} ${x3},${y1} `;
    }
    d += `V${h} H0 Z`;
    return d;
  };

  // 하단 그림자 경로 생성 (바닥에 떨어지는 자연스러운 그림자)
  const getBottomShadowPath = () => {
    const w = 100;
    const h = 100;
    const shadowDistance = 15; // 그림자가 떨어지는 거리
    
    // 커튼 하단에서 시작해서 바닥으로 떨어지는 그림자
    let d = `M0,${h} `;
    
    // 커튼 하단을 따라가되 약간 부드럽게
    for (let i = 0; i <= waveCount; i++) {
      const x = (w / waveCount) * i;
      const waveEase = 0.5 + 0.5 * Math.sin(Math.PI * (x / w));
      const y = h - (waveDepth * depthIntensity * 0.3) * waveEase; // 주름 깊이의 30%만 반영
      d += `L${x},${y} `;
    }
    
    // 바닥으로 떨어지는 그림자 (부드럽게 확장)
    d += `L${w},${h + shadowDistance} L0,${h + shadowDistance} Z`;
    return d;
  };

  // hex 색상 밝기 계산 함수 추가
  function getBrightness(hex: string): number {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  // 색상 조정 함수 실제 구현
  function hexToHSL(hex: string) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }
  function hslToHex(h: number, s: number, l: number) {
    s /= 100; l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  function adjustSaturation(hex: string, percent: number): string {
    const hsl = hexToHSL(hex);
    hsl.s = Math.max(0, Math.min(100, hsl.s + percent));
    return hslToHex(hsl.h, hsl.s, hsl.l);
  }
  function adjustHue(hex: string, deg: number): string {
    const hsl = hexToHSL(hex);
    hsl.h = (hsl.h + deg + 360) % 360;
    return hslToHex(hsl.h, hsl.s, hsl.l);
  }

  // 동적으로 생성되는 주름 그라데이션 (입체감, 깊이감 강조)
  const getPleatGradient = (): React.ReactElement => {
    const brightness = getBrightness(adjustedColor);
    // pleatContrast가 높을수록 명암 차이 극대화
    const dark = adjustBrightness(adjustedColor, -40 * pleatContrast);
    const light = adjustBrightness(adjustedColor, 30 * pleatContrast);
    const stops: React.ReactElement[] = [];
    const count = waveCount;
    for (let i = 0; i <= count; i++) {
      const offset = (i / count) * 100;
      const isValley = i % 2 === 1;
      stops.push(
        <stop
          key={i}
          offset={`${offset}%`}
          stopColor={isValley ? dark : light}
          stopOpacity={isValley ? 1 : 0.9}
        />
      );
    }
    return (
      <linearGradient id="pleatGrad" x1="0" y1="0" x2="1" y2="0">
        {stops}
      </linearGradient>
    );
  };

  // 향상된 SVG 텍스처/노이즈/그라데이션 정의
  const svgDefs = (
    <defs>
      {/* 기본 그라데이션 */}
      <linearGradient id="curtainGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={adjustedColor} stopOpacity={fabricType === "sheer" ? 0.7 : 0.95} />
        <stop offset="50%" stopColor={adjustedColor} stopOpacity={fabricType === "sheer" ? 0.6 : 0.9} />
        <stop offset="100%" stopColor="#fff" stopOpacity={fabricType === "sheer" ? 0.18 : 0.45} />
      </linearGradient>
      
      {/* 상단 그림자 그라데이션 */}
      <linearGradient id="topShadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000" stopOpacity={getBrightness(adjustedColor) > 220 ? 0.38 : getBrightness(adjustedColor) > 180 ? 0.28 : getBrightness(adjustedColor) > 120 ? 0.18 : 0.12} />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </linearGradient>
      
      {/* 하단 그림자 그라데이션 */}
      <linearGradient id="bottomShadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000" stopOpacity="0" />
        <stop offset="70%" stopColor="#000" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#000" stopOpacity={getBrightness(adjustedColor) > 220 ? 0.25 : getBrightness(adjustedColor) > 180 ? 0.2 : getBrightness(adjustedColor) > 120 ? 0.15 : 0.1} />
      </linearGradient>
      
      {/* 3D 깊이 그라데이션 */}
      <linearGradient id="depthGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={adjustedColor} stopOpacity="0.8" />
        <stop offset="30%" stopColor={adjustedColor} stopOpacity="0.6" />
        <stop offset="70%" stopColor={adjustedColor} stopOpacity="0.4" />
        <stop offset="100%" stopColor={adjustedColor} stopOpacity="0.2" />
      </linearGradient>
      
      {/* 측면 그림자 그라데이션 */}
      <linearGradient id="shadowGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
        <stop offset="20%" stopColor="rgba(0,0,0,0.2)" />
        <stop offset="80%" stopColor="rgba(0,0,0,0.2)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
      </linearGradient>
      
      {/* 3D 하이라이트 그라데이션 */}
      <linearGradient id="highlightGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
      </linearGradient>
      
      {/* 미세 텍스처 (실/짜임) */}
      <pattern id="sheerTexture" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="2" height="4" fill="#fff" opacity="0.05" />
        <rect x="2" y="0" width="2" height="4" fill="#fff" opacity="0.03" />
      </pattern>
      
      {/* 린넨 텍스처 */}
      <pattern
        id={linenPatternId}
        width={patternScale}
        height={patternScale}
        patternUnits="userSpaceOnUse"
        patternTransform={`rotate(${patternAngle}) translate(${patternOffset},${patternOffset})`}
      >
        {/* 세로 실결 */}
        <rect x="0" y="0" width={patternScale/8} height={patternScale} fill={adjustBrightness(adjustedColor, 30)} opacity={patternOpacity * 0.8} />
        <rect x={patternScale/2} y="0" width={patternScale/12} height={patternScale} fill={adjustBrightness(adjustedColor, 10)} opacity={patternOpacity * 0.7} />
        {/* 가로 실결 */}
        <rect x="0" y="0" width={patternScale} height={patternScale/10} fill={adjustBrightness(adjustedColor, 20)} opacity={patternOpacity * 0.6} />
        <rect x="0" y={patternScale/2} width={patternScale} height={patternScale/14} fill={adjustBrightness(adjustedColor, 0)} opacity={patternOpacity * 0.5} />
        {/* 미세 점 노이즈 */}
        <circle cx={patternScale/3} cy={patternScale/2} r={patternScale/32} fill={adjustBrightness(adjustedColor, -20)} opacity={patternOpacity * 0.4} />
        <circle cx={patternScale*0.8} cy={patternScale*0.7} r={patternScale/36} fill={adjustBrightness(adjustedColor, -10)} opacity={patternOpacity * 0.3} />
      </pattern>
      
      {/* 향상된 SVG noise filter */}
      <filter id="noise" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="turb" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.06" />
        </feComponentTransfer>
      </filter>
      
      {/* 3D 그림자 필터 */}
      <filter id="depthShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="rgba(0,0,0,0.3)" />
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.2)" />
      </filter>
      
      {/* 부드러운 그림자 필터 */}
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.2)" />
      </filter>
      
      {/* 각 재질별 패턴 추가 */}
      <pattern id={suedePatternId} width={patternScale} height={patternScale} patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternAngle}) translate(${patternOffset},${patternOffset})`}>
        <rect x="0" y="0" width={patternScale} height={patternScale} fill={adjustBrightness(adjustedColor, 20)} opacity={patternOpacity * 0.6} />
        <circle cx={patternScale/2} cy={patternScale/2} r={patternScale/3} fill={adjustBrightness(adjustedColor, 40)} opacity={patternOpacity * 0.8} />
        <circle cx={patternScale/4} cy={patternScale/4} r={patternScale/6} fill={adjustBrightness(adjustedColor, 60)} opacity={patternOpacity * 0.5} />
        <circle cx={patternScale*3/4} cy={patternScale*3/4} r={patternScale/8} fill={adjustBrightness(adjustedColor, 50)} opacity={patternOpacity * 0.4} />
      </pattern>
      <filter id="suedeNoise" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" result="turb" />
        <feColorMatrix type="saturate" values="0.2" />
        <feComponentTransfer><feFuncA type="linear" slope="0.15" /></feComponentTransfer>
      </filter>
      <linearGradient id="velvetGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
        <stop offset="40%" stopColor="#000" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
      </linearGradient>
      <pattern id={squarePatternId} width={patternScale} height={patternScale} patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternAngle}) translate(${patternOffset},${patternOffset})`}>
        <rect x="0" y="0" width={patternScale} height={patternScale} fill="none" />
        <rect x="0" y="0" width={patternScale/2} height={patternScale/2} fill={adjustBrightness(adjustedColor, -40)} opacity={patternOpacity * 0.7} />
        <rect x={patternScale/2} y={patternScale/2} width={patternScale/2} height={patternScale/2} fill={adjustBrightness(adjustedColor, -40)} opacity={patternOpacity * 0.7} />
        <rect x="0" y="0" width={patternScale/2} height={patternScale/2} fill={adjustBrightness(adjustedColor, -60)} opacity={patternOpacity * 0.3} />
        <rect x={patternScale/2} y={patternScale/2} width={patternScale/2} height={patternScale/2} fill={adjustBrightness(adjustedColor, -60)} opacity={patternOpacity * 0.3} />
      </pattern>
      <pattern id={dotPatternId} width={patternScale} height={patternScale} patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternAngle}) translate(${patternOffset},${patternOffset})`}>
        <circle cx={patternScale/2} cy={patternScale/2} r={patternScale/6} fill={adjustBrightness(adjustedColor, -50)} opacity={patternOpacity * 0.8} />
        <circle cx={patternScale/4} cy={patternScale/4} r={patternScale/12} fill={adjustBrightness(adjustedColor, -70)} opacity={patternOpacity * 0.6} />
        <circle cx={patternScale*3/4} cy={patternScale*3/4} r={patternScale/12} fill={adjustBrightness(adjustedColor, -70)} opacity={patternOpacity * 0.6} />
      </pattern>
      <pattern id={herringbonePatternId} width={patternScale * 1.5} height={patternScale * 1.5} patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternAngle}) translate(${patternOffset},${patternOffset})`}>
        <path d={`M0,${patternScale * 1.5} L${patternScale * 1.5},0 M-${patternScale/4},${patternScale * 1.25} L${patternScale/4},${patternScale/4} M${patternScale * 1.25},${patternScale * 1.75} L${patternScale * 1.75},${patternScale * 1.25}`} stroke={adjustBrightness(adjustedColor, -60)} strokeWidth="2" opacity={patternOpacity * 0.8} />
        <path d={`M${patternScale/2},${patternScale * 1.5} L${patternScale * 1.5},${patternScale/2} M${patternScale/4},${patternScale * 1.25} L${patternScale*3/4},${patternScale/4} M${patternScale * 1.25},${patternScale * 1.75} L${patternScale * 1.75},${patternScale * 1.25}`} stroke={adjustBrightness(adjustedColor, -80)} strokeWidth="1" opacity={patternOpacity * 0.5} />
      </pattern>
      <pattern id={stripePatternId} width={patternScale} height={patternScale} patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternAngle}) translate(${patternOffset},${patternOffset})`}>
        <rect x="0" y="0" width={patternScale/2} height={patternScale} fill={adjustBrightness(adjustedColor, -50)} opacity={patternOpacity * 0.8} />
        <rect x="0" y="0" width={patternScale/4} height={patternScale} fill={adjustBrightness(adjustedColor, -70)} opacity={patternOpacity * 0.4} />
        <rect x={patternScale/2} y="0" width={patternScale/4} height={patternScale} fill={adjustBrightness(adjustedColor, -30)} opacity={patternOpacity * 0.3} />
      </pattern>
      <pattern id={wavePatternId} width={patternScale * 1.5} height={patternScale * 0.75} patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternAngle}) translate(${patternOffset},${patternOffset})`}>
        <path d={`M0,${patternScale * 0.375} Q${patternScale * 0.375},0 ${patternScale * 0.75},${patternScale * 0.375} T${patternScale * 1.5},${patternScale * 0.375}`} stroke={adjustBrightness(adjustedColor, -50)} strokeWidth="2" fill="none" opacity={patternOpacity * 0.8} />
        <path d={`M0,${patternScale * 0.375} Q${patternScale * 0.375},${patternScale * 0.75} ${patternScale * 0.75},${patternScale * 0.375} T${patternScale * 1.5},${patternScale * 0.375}`} stroke={adjustBrightness(adjustedColor, -70)} strokeWidth="1" fill="none" opacity={patternOpacity * 0.4} />
      </pattern>
      <pattern id={tweedPatternId} width={patternScale * 0.75} height={patternScale * 0.75} patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternAngle}) translate(${patternOffset},${patternOffset})`}>
        <rect x="0" y="0" width={patternScale * 0.75} height={patternScale * 0.75} fill="none" />
        <circle cx={patternScale * 0.125} cy={patternScale * 0.125} r={patternScale * 0.1} fill={adjustBrightness(adjustedColor, -60)} opacity={patternOpacity * 0.8} />
        <rect x={patternScale * 0.375} y={patternScale * 0.375} width={patternScale * 0.125} height={patternScale * 0.25} fill={adjustBrightness(adjustedColor, -60)} opacity={patternOpacity * 0.8} />
        <circle cx={patternScale * 0.625} cy={patternScale * 0.625} r={patternScale * 0.08} fill={adjustBrightness(adjustedColor, -80)} opacity={patternOpacity * 0.6} />
        <rect x={patternScale * 0.125} y={patternScale * 0.5} width={patternScale * 0.1} height={patternScale * 0.15} fill={adjustBrightness(adjustedColor, -80)} opacity={patternOpacity * 0.6} />
      </pattern>
      <pattern id={checkPatternId} width={patternScale * 1.25} height={patternScale * 1.25} patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternAngle}) translate(${patternOffset},${patternOffset})`}>
        <rect x="0" y="0" width={patternScale * 0.625} height={patternScale * 0.625} fill={adjustBrightness(adjustedColor, -50)} opacity={patternOpacity * 0.8} />
        <rect x={patternScale * 0.625} y={patternScale * 0.625} width={patternScale * 0.625} height={patternScale * 0.625} fill={adjustBrightness(adjustedColor, -50)} opacity={patternOpacity * 0.8} />
        <rect x="0" y="0" width={patternScale * 0.625} height={patternScale * 0.625} fill={adjustBrightness(adjustedColor, -70)} opacity={patternOpacity * 0.4} />
        <rect x={patternScale * 0.625} y={patternScale * 0.625} width={patternScale * 0.625} height={patternScale * 0.625} fill={adjustBrightness(adjustedColor, -70)} opacity={patternOpacity * 0.4} />
      </pattern>
      
      {getPleatGradient()}
      <filter id="bottomShadowBlur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation={shadowBlur} />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.8" />
        </feComponentTransfer>
      </filter>
    </defs>
  );

  // 3D 속커튼(쉬어) 스타일 - 여러 레이어로 깊이감 표현
  const renderSheer = () => (
    <g>
      {/* 상단 그림자/마감선 */}
      <rect x="0" y="0" width="100" height="4" fill="url(#topShadow)" opacity="0.32" />
      {/* 배경 그림자 레이어 (깊이감 강조) */}
      <path
        d={getShadowWavePath()}
        fill="rgba(0,0,0,0.22)"
        opacity="0.45"
        transform="translate(2, 2)"
      />
      
      {/* 메인 입체 주름 레이어 */}
      <path
        d={getWavePath(0)}
        fill="url(#pleatGrad)"
        opacity="0.7"
      />
      
      {/* 기존 컬러 그라데이션을 살짝 겹침 */}
      <path
        d={getWavePath(0)}
        fill="url(#curtainGrad)"
        opacity="0.7"
      />
      
      {/* 색상 조정 강화 레이어 (속커튼용) */}
      <path
        d={getWavePath(0)}
        fill={adjustedColor}
        opacity="0.4"
      />
      
      {/* 깊이 레이어 1 */}
      <path
        d={getWavePath(1)}
        fill="url(#depthGrad)"
        opacity="0.3"
      />
      
      {/* 깊이 레이어 2 */}
      <path
        d={getWavePath(2)}
        fill="url(#depthGrad)"
        opacity="0.2"
      />
      
      {/* 하이라이트 레이어 */}
      <path
        d={getWavePath(0)}
        fill="url(#highlightGrad)"
        opacity="0.2"
      />
      
      {/* 기본 쉬어 텍스처 */}
      <rect width="100" height="100" fill="url(#sheerTexture)" opacity="0.4" />
      <rect width="100" height="100" filter="url(#noise)" opacity="0.2" />
      
      {/* 재질 패턴 적용 (속커튼용 강화된 투명도) */}
      {materialType === "linen" && (
        <path d={getWavePath(0)} fill={`url(#${linenPatternId})`} opacity={patternOpacity * 2.0} />
      )}
      {materialType === "suede" && (
        <>
          <path d={getWavePath(0)} fill={`url(#${suedePatternId})`} opacity={patternOpacity * 1.8} />
          <path d={getWavePath(0)} filter="url(#suedeNoise)" fill="#fff" opacity="0.15" />
        </>
      )}
      {materialType === "velvet" && (
        <>
          <path d={getWavePath(0)} fill="url(#velvetGrad)" opacity="0.35" />
          <path d={getWavePath(0)} filter="url(#noise)" fill="#fff" opacity="0.15" />
        </>
      )}
      {materialType === "square" && (
        <path d={getWavePath(0)} fill={`url(#${squarePatternId})`} opacity={patternOpacity * 1.8} />
      )}
      {materialType === "dot" && (
        <path d={getWavePath(0)} fill={`url(#${dotPatternId})`} opacity={patternOpacity * 1.7} />
      )}
      {materialType === "herringbone" && (
        <path d={getWavePath(0)} fill={`url(#${herringbonePatternId})`} opacity={patternOpacity * 2.0} />
      )}
      {materialType === "stripe" && (
        <path d={getWavePath(0)} fill={`url(#${stripePatternId})`} opacity={patternOpacity * 1.8} />
      )}
      {materialType === "wave" && (
        <path d={getWavePath(0)} fill={`url(#${wavePatternId})`} opacity={patternOpacity * 1.7} />
      )}
      {materialType === "tweed" && (
        <path d={getWavePath(0)} fill={`url(#${tweedPatternId})`} opacity={patternOpacity * 2.0} />
      )}
      {materialType === "check" && (
        <path d={getWavePath(0)} fill={`url(#${checkPatternId})`} opacity={patternOpacity * 1.8} />
      )}
      
      {/* 하단 그림자 (커튼 모양을 따라가는 그림자) */}
      <path
        d={getBottomShadowPath()}
        fill={shadowColor}
        opacity={shadowStrength * 0.6}
        filter="url(#bottomShadowBlur)"
      />
    </g>
  );

  // 3D 겉커튼(민자) 스타일 - 더 입체적이고 자연스럽게
  const renderPlain = () => (
    <g>
      {/* 상단 그림자/마감선 */}
      <rect x="0" y="0" width="100" height="4" fill="url(#topShadow)" opacity="0.38" />
      {/* 배경 그림자 레이어 (깊이감 강조) */}
      <path
        d={getShadowWavePath()}
        fill="rgba(0,0,0,0.28)"
        opacity="0.55"
        transform="translate(3, 3)"
        filter="url(#depthShadow)"
      />
      
      {/* 메인 입체 주름 레이어 */}
      <path
        d={getWavePath(0)}
        fill="url(#pleatGrad)"
        opacity="1"
      />
      
      {/* 기존 컬러 그라데이션을 살짝 겹침 */}
      <path
        d={getWavePath(0)}
        fill="url(#curtainGrad)"
        opacity="0.7"
      />
      
      {/* 깊이 레이어 1 */}
      <path
        d={getWavePath(1)}
        fill="url(#depthGrad)"
        opacity="0.4"
      />
      
      {/* 깊이 레이어 2 */}
      <path
        d={getWavePath(2)}
        fill="url(#depthGrad)"
        opacity="0.3"
      />
      
      {/* 깊이 레이어 3 */}
      <path
        d={getWavePath(3)}
        fill="url(#depthGrad)"
        opacity="0.2"
      />
      
      {/* 하이라이트 레이어 */}
      <path
        d={getWavePath(0)}
        fill="url(#highlightGrad)"
        opacity="0.25"
      />
      
      {materialType === "linen" && (
        <path d={getWavePath(0)} fill={`url(#${linenPatternId})`} opacity={patternOpacity * 1.5} />
      )}
      {materialType === "suede" && (
        <>
          <path d={getWavePath(0)} fill={`url(#${suedePatternId})`} opacity={patternOpacity * 1.2} />
          <path d={getWavePath(0)} filter="url(#suedeNoise)" fill="#fff" opacity="0.12" />
        </>
      )}
      {materialType === "velvet" && (
        <>
          <path d={getWavePath(0)} fill="url(#velvetGrad)" opacity="0.25" />
          <path d={getWavePath(0)} filter="url(#noise)" fill="#fff" opacity="0.12" />
        </>
      )}
      {materialType === "square" && (
        <path d={getWavePath(0)} fill={`url(#${squarePatternId})`} opacity={patternOpacity * 1.3} />
      )}
      {materialType === "dot" && (
        <path d={getWavePath(0)} fill={`url(#${dotPatternId})`} opacity={patternOpacity * 1.2} />
      )}
      {materialType === "herringbone" && (
        <path d={getWavePath(0)} fill={`url(#${herringbonePatternId})`} opacity={patternOpacity * 1.4} />
      )}
      {materialType === "stripe" && (
        <path d={getWavePath(0)} fill={`url(#${stripePatternId})`} opacity={patternOpacity * 1.3} />
      )}
      {materialType === "wave" && (
        <path d={getWavePath(0)} fill={`url(#${wavePatternId})`} opacity={patternOpacity * 1.2} />
      )}
      {materialType === "tweed" && (
        <path d={getWavePath(0)} fill={`url(#${tweedPatternId})`} opacity={patternOpacity * 1.4} />
      )}
      {materialType === "check" && (
        <path d={getWavePath(0)} fill={`url(#${checkPatternId})`} opacity={patternOpacity * 1.3} />
      )}
      
      {/* 하단 그림자 (커튼 모양을 따라가는 그림자) */}
      <path
        d={getBottomShadowPath()}
        fill={shadowColor}
        opacity={shadowStrength * 0.6}
        filter="url(#bottomShadowBlur)"
      />
    </g>
  );

  // 3D 암막 스타일 - 더 진하고 무거운 느낌
  const renderBlackout = () => (
    <g>
      {/* 상단 그림자/마감선 */}
      <rect x="0" y="0" width="100" height="4" fill="url(#topShadow)" opacity="1" />
      
      {/* 메인 불투명 베이스 레이어 (배경 완전 차단) */}
      <path
        d={getWavePath(0)}
        fill={adjustedColor}
        opacity="1"
      />
      
      {/* 배경 그림자 레이어 (깊이감 강조) */}
      <path
        d={getShadowWavePath()}
        fill="rgba(0,0,0,0.8)"
        opacity="0.9"
        transform="translate(4, 4)"
        filter="url(#depthShadow)"
      />
      
      {/* 강화된 주름 그라데이션 (색상 대비로 주름 표현) */}
      <path
        d={getWavePath(0)}
        fill="url(#pleatGrad)"
        opacity="0.8"
      />
      
      {/* 컬러 그라데이션(입체감+컬러) */}
      <path
        d={getWavePath(0)}
        fill="url(#curtainGrad)"
        opacity="0.6"
      />
      
      {/* 깊이 레이어 1 (더 진한 색상으로 주름 강조) */}
      <path
        d={getWavePath(1)}
        fill={adjustedColor}
        opacity="0.4"
      />
      
      {/* 깊이 레이어 2 (더 진한 색상으로 주름 강조) */}
      <path
        d={getWavePath(2)}
        fill={adjustedColor}
        opacity="0.2"
      />
      
      {/* 하이라이트 레이어 (주름의 밝은 부분) */}
      <path
        d={getWavePath(0)}
        fill="url(#highlightGrad)"
        opacity="0.3"
      />
      
      {materialType === "linen" && (
        <path d={getWavePath(0)} fill={`url(#${linenPatternId})`} opacity={patternOpacity * 1.5} />
      )}
      {materialType === "suede" && (
        <>
          <path d={getWavePath(0)} fill={`url(#${suedePatternId})`} opacity={patternOpacity * 1.2} />
          <path d={getWavePath(0)} filter="url(#suedeNoise)" fill="#fff" opacity="0.12" />
        </>
      )}
      {materialType === "velvet" && (
        <>
          <path d={getWavePath(0)} fill="url(#velvetGrad)" opacity="0.25" />
          <path d={getWavePath(0)} filter="url(#noise)" fill="#fff" opacity="0.12" />
        </>
      )}
      {materialType === "square" && (
        <path d={getWavePath(0)} fill={`url(#${squarePatternId})`} opacity={patternOpacity * 1.3} />
      )}
      {materialType === "dot" && (
        <path d={getWavePath(0)} fill={`url(#${dotPatternId})`} opacity={patternOpacity * 1.2} />
      )}
      {materialType === "herringbone" && (
        <path d={getWavePath(0)} fill={`url(#${herringbonePatternId})`} opacity={patternOpacity * 1.4} />
      )}
      {materialType === "stripe" && (
        <path d={getWavePath(0)} fill={`url(#${stripePatternId})`} opacity={patternOpacity * 1.3} />
      )}
      {materialType === "wave" && (
        <path d={getWavePath(0)} fill={`url(#${wavePatternId})`} opacity={patternOpacity * 1.2} />
      )}
      {materialType === "tweed" && (
        <path d={getWavePath(0)} fill={`url(#${tweedPatternId})`} opacity={patternOpacity * 1.4} />
      )}
      {materialType === "check" && (
        <path d={getWavePath(0)} fill={`url(#${checkPatternId})`} opacity={patternOpacity * 1.3} />
      )}
    </g>
  );

  // 3D 효과를 위한 CSS 스타일 - perspectiveAngle 적용
  const get3DStyle = () => ({
    transform: `perspective(1000px) rotateX(${perspectiveAngle}deg)`,
    transformStyle: "preserve-3d" as const,
    transition: "clip-path 0.5s cubic-bezier(.4,2,.6,1), transform 0.3s ease",
  });

  // 양개 커튼 렌더링 (이중) - 3D 효과 적용
  const renderDoubleCurtain = () => {
    // 열림 시 남는 커튼 폭 (%)
    const minWidth = 15; // 완전 열림 시 각 커튼이 차지하는 최소 폭
    const maxWidth = 50; // 완전 닫힘 시 각 커튼이 차지하는 최대 폭
    // 선형 보간
    const leftWidth = maxWidth - ((maxWidth - minWidth) * (curtainOpen / 100));
    const rightWidth = maxWidth - ((maxWidth - minWidth) * (curtainOpen / 100));
    const rightLeft = 100 - rightWidth;
    
    return (
      <>
        {/* 왼쪽 커튼 */}
        <div
          style={{
            width: `${leftWidth}%`,
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            opacity,
            overflow: "hidden",
            ...get3DStyle(),
            pointerEvents: "none"
          }}
        >
          <svg
            width="200%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ display: "block", position: "absolute", left: 0, top: 0 }}
          >
            {svgDefs}
            {fabricType === "sheer"
              ? renderSheer()
              : fabricType === "blackout"
              ? renderBlackout()
              : renderPlain()}
          </svg>
        </div>
        {/* 오른쪽 커튼 */}
        <div
          style={{
            width: `${rightWidth}%`,
            height: "100%",
            position: "absolute",
            top: 0,
            left: `${rightLeft}%`,
            opacity,
            overflow: "hidden",
            ...get3DStyle(),
            pointerEvents: "none"
          }}
        >
          <svg
            width="200%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ display: "block", position: "absolute", left: "-100%", top: 0 }}
          >
            {svgDefs}
            {fabricType === "sheer"
              ? renderSheer()
              : fabricType === "blackout"
              ? renderBlackout()
              : renderPlain()}
          </svg>
        </div>
      </>
    );
  };

  return renderDoubleCurtain();
};

// 색상 밝기 조절 함수
const adjustBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return "#" + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
};

export default CurtainRenderer; 