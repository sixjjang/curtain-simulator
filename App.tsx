import React from "react";
import { useRouter } from "next/router";
import HomePage from "./pages/index";
import SimulatorPage from "./pages/Simulator";

function App() {
  const router = useRouter();
  const { pathname } = router;

  // Next.js에서는 파일 기반 라우팅을 사용하므로
  // 이 App 컴포넌트는 공통 레이아웃이나 전역 상태 관리용으로 사용
  return (
    <div style={{ 
      minHeight: "100vh",
      backgroundColor: "#f9fafb"
    }}>
      {/* 공통 헤더나 네비게이션을 여기에 추가할 수 있습니다 */}
      {pathname === "/" && <HomePage />}
      {pathname === "/Simulator" && <SimulatorPage />}
    </div>
  );
}

export default App; 