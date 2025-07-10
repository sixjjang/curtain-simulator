// pages/Simulator.tsx
import React from "react";
import { CurtainSimulator } from "curtain-simulator-ui";
// import { CurtainSimulator } from "curtain-simulator-ui"; // 기존 코드 주석 처리

const SimulatorPage: React.FC = () => {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--color-bg)",
      padding: "2rem",
      maxWidth: "1400px",
      margin: "0 auto"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "3rem"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "var(--color-text)",
          marginBottom: "0.5rem"
        }}>
          커튼 시뮬레이션
        </h1>
        <div style={{
          display: "inline-block",
          textAlign: "left",
          background: "rgba(255,255,255,0.92)",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(40,40,40,0.07)",
          padding: "1.1em 1.5em 1.1em 1.5em",
          marginTop: "1.1em",
          fontSize: "1.08rem",
          color: "#333",
          fontWeight: 500,
          lineHeight: 1.7,
          maxWidth: "480px"
        }}>
          <div style={{marginBottom:'0.5em',fontWeight:700,color:'#d72660',fontSize:'1.08em'}}>사진을 업로드하여 커튼 시뮬레이션을 시작하세요</div>
          <div style={{marginBottom:'0.2em',color:'#6c3483',fontWeight:600,fontSize:'0.98em'}}>*가로형 사진 사용을 추천드립니다. (16:9, 4:3 등..)</div>
          <div style={{marginBottom:'0.2em',color:'#888',fontSize:'0.97em'}}>*이미지 저장은 각 기기의 캡쳐 기능을 사용하세요</div>
          <div style={{marginBottom:'0.2em',color:'#555',fontSize:'0.97em'}}>*커튼 구입전 컬러 매칭에 도움을 드리는 프로그램입니다.</div>
          <div style={{marginTop:'0.5em',color:'#d72660',fontWeight:600,fontSize:'0.99em'}}>*커튼 구입 상담은 윈도우갤러리로 연락주세요. (031.205.2056)</div>
        </div>
      </div>
      
      {/* @ts-ignore */}
      <CurtainSimulator />
    </div>
  );
};

export default SimulatorPage; 