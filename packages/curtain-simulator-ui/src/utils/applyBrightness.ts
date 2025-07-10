/**
 * 겹친 커튼의 암막률을 기준으로 최종 투과율 계산 후
 * 실내 밝기에 반영할 밝기값(0~1)을 반환
 * 
 * @param innerOpacity 속커튼 투과율 (예: 0.3 → 30% 투과)
 * @param outerOpacity 겉커튼 투과율 (예: 0.1 → 10% 투과)
 */
export function calculateBrightness(innerOpacity: number, outerOpacity: number): number {
  const effectiveTransmission = innerOpacity * outerOpacity;
  return Math.max(0.15, Math.min(1, effectiveTransmission)); // 최소 밝기 보장
} 