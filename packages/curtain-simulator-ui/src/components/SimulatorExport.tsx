import React, { useRef, useState } from "react";
// PDF 저장을 위한 jsPDF import
import { jsPDF } from "jspdf";

interface SimulatorExportProps {
  containerId: string; // 캡처할 DOM id
}

const SimulatorExport: React.FC<SimulatorExportProps> = ({ containerId }) => {
  // 아무것도 렌더링하지 않음 (버튼 삭제)
  return null;
};

export default SimulatorExport; 