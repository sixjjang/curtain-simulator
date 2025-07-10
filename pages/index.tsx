import React, { useState } from "react";
import Link from "next/link";

const CurtainIcon = () => (
  <svg width="1.3em" height="1.3em" viewBox="0 0 32 32" fill="none" style={{marginRight:8, verticalAlign:'middle'}}>
    <rect x="4" y="6" width="24" height="20" rx="4" fill="#fff" fillOpacity="0.13" stroke="#d72660" strokeWidth="1.5"/>
    <rect x="7" y="9" width="4" height="14" rx="2" fill="#d72660" fillOpacity="0.5"/>
    <rect x="21" y="9" width="4" height="14" rx="2" fill="#d72660" fillOpacity="0.5"/>
    <rect x="13" y="9" width="6" height="14" rx="3" fill="#f46036" fillOpacity="0.3"/>
  </svg>
);

const icons = {
  naverBlog: (
    <svg width="1.8em" height="1.8em" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#19CE60"/><path d="M14 16.5c0-1.105.895-2 2-2h16c1.105 0 2 .895 2 2v15c0 1.105-.895 2-2 2h-6.5l-3.5 3.5-3.5-3.5H16c-1.105 0-2-.895-2-2v-15Z" fill="#fff"/></svg>
  ),
  instagram: (
    <svg width="1.8em" height="1.8em" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="igGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#feda75"/>
          <stop offset="0.5" stopColor="#d62976"/>
          <stop offset="1" stopColor="#4f5bd5"/>
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="36" height="36" rx="10" fill="url(#igGrad)"/>
      <rect x="14" y="14" width="20" height="20" rx="6" fill="none" stroke="#fff" strokeWidth="2"/>
      <circle cx="24" cy="24" r="6.2" fill="none" stroke="#fff" strokeWidth="2"/>
      <circle cx="30.5" cy="17.5" r="1.3" fill="#fff"/>
    </svg>
  ),
  youtube: (
    <svg width="1.8em" height="1.8em" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#fff"/><rect x="10" y="16" width="28" height="16" rx="6" fill="#FF0000"/><polygon points="22,20 22,28 30,24" fill="#fff"/></svg>
  ),
  naverMap: (
    <svg width="1.8em" height="1.8em" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#19CE60"/><path d="M24 12c-5.523 0-10 4.477-10 10 0 7.5 10 14 10 14s10-6.5 10-14c0-5.523-4.477-10-10-10Zm0 13.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" fill="#fff"/></svg>
  ),
};

const defaultLinks = {
  naverBlog: "https://blog.naver.com/",
  instagram: "https://instagram.com/",
  youtube: "https://youtube.com/",
  naverMap: "https://map.naver.com/",
};

const HomePage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [links, setLinks] = useState(defaultLinks);
  const [tempLinks, setTempLinks] = useState(links);

  const handleChange = (key: keyof typeof tempLinks, value: string) => {
    setTempLinks({ ...tempLinks, [key]: value });
  };
  const handleSave = () => {
    setLinks(tempLinks);
    setShowSettings(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/bg_main.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 설정 버튼 - 우측 상단 */}
      <button onClick={()=>setShowSettings(v=>!v)} style={{position:'absolute',top:32,right:36,zIndex:10,background:'rgba(255,255,255,0.7)',border:'none',borderRadius:8,padding:'0.4em 1.1em',fontWeight:600,color:'#d72660',fontSize:'0.98em',boxShadow:'0 2px 8px #d7266011',cursor:'pointer',letterSpacing:'0.01em',display:'flex',alignItems:'center',gap:6,backdropFilter:'blur(2px)'}}>
        <svg width="1.2em" height="1.2em" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#d72660" strokeWidth="1.5"/><path d="M10 7v3.5l2 2" stroke="#d72660" strokeWidth="1.5" strokeLinecap="round"/></svg>
        설정
      </button>
      {/* 오버레이 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(255,255,255,0.03)",
          zIndex: 1,
          backdropFilter: "blur(1.5px)",
        }}
      />
      {/* 카드 */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "390px",
          width: "100%",
          margin: "0 auto",
          padding: "3.2rem 1.5rem 1.7rem 1.5rem",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.08)",
          boxShadow: "0 2px 16px 0 rgba(40,40,40,0.08)",
          position: "relative",
          zIndex: 2,
          border: "1px solid rgba(215,38,96,0.08)",
          backdropFilter: "blur(3px)",
          animation: "fadeInCard 1.2s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* 안내문구 */}
        <div style={{
          fontWeight: 700,
          fontSize: "1.13rem",
          color: "#222",
          marginBottom: "0.7rem",
          letterSpacing: "0.01em",
          textShadow: "0 1px 6px rgba(0,0,0,0.04)",
        }}>
          WINDOW GALLERY <span style={{color:'#d72660'}}>031.205.2056</span>
        </div>
        <div style={{fontWeight:400, color:'#6c3483', fontSize:'0.97em', marginBottom:'1.7rem', opacity:0.7, letterSpacing:'-0.01em'}}>
          (윈도우스토리 수원영통점, 헌터더글라스 공식판매점)
        </div>
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 900,
            marginBottom: "1.1rem",
            lineHeight: 1.13,
            letterSpacing: "-0.02em",
            background: "none",
            color: "transparent",
            WebkitTextStroke: "1.3px #fff",
            textShadow: "0 2px 12px rgba(40,40,40,0.13), 0 1px 6px #d7266033",
            filter: "drop-shadow(0 2px 8px rgba(215,38,96,0.07))",
            textAlign: "center",
            textTransform: "none",
            padding: 0,
            WebkitBackgroundClip: undefined,
            WebkitTextFillColor: undefined,
          }}
        >
          우리집 커튼 만들기
        </h1>
        <p
          style={{
            fontSize: "1.13rem",
            color: "#fff",
            marginBottom: "2.1rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            opacity:0.98,
            textShadow: "0 2px 12px rgba(40,40,40,0.18), 0 1px 6px #d7266044",
            background: "rgba(0,0,0,0.10)",
            borderRadius: "8px",
            padding: "0.2em 0.7em"
          }}
        >
          우리집 사진 한장으로 컬러 매칭 해보세요
        </p>
        <Link
          href="/Simulator"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #d72660 0%, #f46036 100%)",
            color: "white",
            padding: "0.95rem 2rem 0.95rem 1.5rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontSize: "1.03rem",
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(215,38,96,0.08)",
            transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
            marginBottom: "1.3rem",
            textShadow: "0 1px 6px rgba(0,0,0,0.07)",
            gap: "0.5em",
            border: "none",
            cursor: "pointer",
            outline: "none",
            position: "relative",
            overflow: "hidden",
            letterSpacing: "0.01em",
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = "linear-gradient(135deg, #f46036 0%, #d72660 100%)";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = "linear-gradient(135deg, #d72660 0%, #f46036 100%)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <CurtainIcon />
          시뮬레이션 시작하기
        </Link>
        {/* SNS/지도 아이콘 링크 */}
        <div style={{display:'flex',justifyContent:'center',gap:'2em',marginTop:'0.5rem',marginBottom:'0.2rem'}}>
          <a href={links.naverBlog} target="_blank" rel="noopener noreferrer" title="네이버블로그" style={{opacity:0.88,transition:'opacity 0.2s',borderRadius:'12px',boxShadow:'0 1px 6px #19ce6011'}}>{icons.naverBlog}</a>
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" title="인스타그램" style={{opacity:0.88,transition:'opacity 0.2s',borderRadius:'12px',boxShadow:'0 1px 6px #d6297611'}}>{icons.instagram}</a>
          <a href={links.youtube} target="_blank" rel="noopener noreferrer" title="유튜브" style={{opacity:0.88,transition:'opacity 0.2s',borderRadius:'12px',boxShadow:'0 1px 6px #ff000011'}}>{icons.youtube}</a>
          <a href={links.naverMap} target="_blank" rel="noopener noreferrer" title="네이버지도" style={{opacity:0.88,transition:'opacity 0.2s',borderRadius:'12px',boxShadow:'0 1px 6px #19ce6011'}}>{icons.naverMap}</a>
        </div>
        {/* 설정 메뉴 */}
        {showSettings && (
          <div style={{marginTop:'1.5rem',background:'rgba(255,255,255,0.98)',borderRadius:12,padding:'1.2em 1em',boxShadow:'0 2px 12px #d7266022',textAlign:'left'}}>
            <div style={{fontWeight:700,marginBottom:8,color:'#d72660'}}>SNS/지도 링크 설정</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <label>네이버블로그: <input value={tempLinks.naverBlog} onChange={e=>handleChange('naverBlog',e.target.value)} style={{width:'80%'}} /></label>
              <label>인스타그램: <input value={tempLinks.instagram} onChange={e=>handleChange('instagram',e.target.value)} style={{width:'80%'}} /></label>
              <label>유튜브: <input value={tempLinks.youtube} onChange={e=>handleChange('youtube',e.target.value)} style={{width:'80%'}} /></label>
              <label>네이버지도: <input value={tempLinks.naverMap} onChange={e=>handleChange('naverMap',e.target.value)} style={{width:'80%'}} /></label>
            </div>
            <button onClick={handleSave} style={{marginTop:12,padding:'0.5em 1.5em',background:'#d72660',color:'#fff',border:'none',borderRadius:8,fontWeight:600,cursor:'pointer'}}>저장 & 숨기기</button>
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes fadeInCard {
          0% { opacity: 0; transform: translateY(40px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 600px) {
          div[style*='max-width: 410px'] {
            padding: 1.2rem 0.3rem 1rem 0.3rem !important;
            border-radius: 12px !important;
          }
          h1 {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage; 