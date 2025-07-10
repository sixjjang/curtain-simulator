// 커튼 주름 마스크 URL 매핑

const pleatMaskUrl = "/masks/mask_pleat.png"; // 민자
const waveMaskUrl = "/masks/mask_wave.png";   // 나비

export function getMaskUrl(maskType: "pleat" | "wave") {
  return maskType === "pleat" ? pleatMaskUrl : waveMaskUrl;
} 