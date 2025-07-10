import React, { useState, useEffect, useRef } from "react";
import UploadPhoto from "./UploadPhoto";
import WindowSelector from "./WindowSelector";
import CurtainStateToggle from "./CurtainStateToggle";
import CurtainDisplay from "./CurtainDisplay";
import ProductSelector from "./ProductSelector";
import ColorSelector from "./ColorSelector";
import LightControl from './simulator/LightControl';
import SimulationScene from "./SimulationScene";
import SimulatorExport from "./SimulatorExport";
import SettingsManager from "./SettingsManager";
import { CurtainSample } from "../data/sampleCurtains";
import { Color } from "../data/colorPalette";
import { sampleCurtains } from "../data/sampleCurtains";

const CurtainSimulator: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [windowArea, setWindowArea] = useState({
    x: 25,
    y: 20,
    width: 30,
    height: 40,
  });
  const [curtainOpen, setCurtainOpen] = useState(50);
  const [selectedProducts, setSelectedProducts] = useState<CurtainSample[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [indoorLight, setIndoorLight] = useState(50);
  const [sunLight, setSunLight] = useState(50);
  const [curtainWidth, setCurtainWidth] = useState(100);
  const [waveDepth, setWaveDepth] = useState(3);
  const [visiblePleats, setVisiblePleats] = useState(30);
  const [curtainOpacity, setCurtainOpacity] = useState(0.95);
  const [perspectiveAngle, setPerspectiveAngle] = useState(0);
  const [depthIntensity, setDepthIntensity] = useState(0.5);
  const [materialType, setMaterialType] = useState<"plain" | "linen" | "suede" | "velvet" | "square" | "dot" | "herringbone" | "stripe" | "wave" | "tweed" | "check">("linen");
  const [patternScale, setPatternScale] = useState(4);
  const [patternOpacity, setPatternOpacity] = useState(0.45);
  const [patternAngle, setPatternAngle] = useState(0);
  const [patternOffset, setPatternOffset] = useState(0);
  const [colorLightness, setColorLightness] = useState(0);
  const [colorSaturation, setColorSaturation] = useState(0);
  const [colorHue, setColorHue] = useState(0);
  const [pleatContrast, setPleatContrast] = useState(1.8);
  const [showWindowModal, setShowWindowModal] = useState(false);
  const [isWindowAdjustMode, setIsWindowAdjustMode] = useState(false);
  const [isWindowTouched, setIsWindowTouched] = useState(false);
  const [tempWindowArea, setTempWindowArea] = useState(windowArea);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragType, setDragType] = useState<'move' | 'resize' | 'new' | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number; direction?: string } | null>(null);
  const [isPaletteExpanded, setIsPaletteExpanded] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [shadowStrength, setShadowStrength] = useState(0.83);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(5);
  const [shadowHeight, setShadowHeight] = useState(16);

  const containerRef = useRef<HTMLDivElement>(null);

  // 커튼 타입이 변경될 때마다 투명도 기본값 자동 설정
  useEffect(() => {
    if (selectedProducts.length > 0) {
      if (selectedProducts[0].type === "겉커튼") {
        setCurtainOpacity(0.98);
      } else {
        setCurtainOpacity(0.95);
      }
    }
  }, [selectedProducts]);

  // windowArea가 변경될 때 tempWindowArea도 동기화
  useEffect(() => {
    setTempWindowArea(windowArea);
  }, [windowArea]);

  // 전역 마우스/터치 이벤트 처리
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isWindowAdjustMode && isDragging && dragType) {
        e.preventDefault();
        const container = containerRef.current;
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const coords = { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
        
        if (dragType === 'new' && dragStart) {
          const newX = Math.min(dragStart.x, coords.x);
          const newY = Math.min(dragStart.y, coords.y);
          const newWidth = Math.max(5, Math.abs(coords.x - dragStart.x));
          const newHeight = Math.max(5, Math.abs(coords.y - dragStart.y));
          setTempWindowArea({ x: newX, y: newY, width: newWidth, height: newHeight });
        } else if (dragType === 'move' && dragOffset) {
          const newX = coords.x - dragOffset.x;
          const newY = coords.y - dragOffset.y;
          const clampedX = Math.max(0, Math.min(100 - tempWindowArea.width, newX));
          const clampedY = Math.max(0, Math.min(100 - tempWindowArea.height, newY));
          setTempWindowArea({ ...tempWindowArea, x: clampedX, y: clampedY });
        } else if (dragType === 'resize' && dragStart) {
          // 리사이즈 로직
          let newArea = { ...tempWindowArea };
          
          // 현재 드래그 중인 방향에 따라 크기 조정
          const resizeDirection = dragOffset?.direction || 'se'; // 기본값
          
          if (resizeDirection.includes('n')) {
            const newHeight = tempWindowArea.height + (tempWindowArea.y - coords.y);
            if (newHeight > 5) {
              newArea.y = coords.y;
              newArea.height = newHeight;
            }
          }
          if (resizeDirection.includes('s')) {
            newArea.height = Math.max(5, coords.y - tempWindowArea.y);
          }
          if (resizeDirection.includes('w')) {
            const newWidth = tempWindowArea.width + (tempWindowArea.x - coords.x);
            if (newWidth > 5) {
              newArea.x = coords.x;
              newArea.width = newWidth;
            }
          }
          if (resizeDirection.includes('e')) {
            newArea.width = Math.max(5, coords.x - tempWindowArea.x);
          }
          
          // 경계 체크
          newArea.x = Math.max(0, Math.min(100 - newArea.width, newArea.x));
          newArea.y = Math.max(0, Math.min(100 - newArea.height, newArea.y));
          
          setTempWindowArea(newArea);
        }
      }
    };

    const handleGlobalMouseUp = () => {
      if (isWindowAdjustMode) {
        setIsDragging(false);
        setDragStart(null);
        setDragType(null);
        setDragOffset(null);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isWindowAdjustMode && isDragging && dragType && e.touches.length > 0) {
        e.preventDefault();
        const container = containerRef.current;
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
        const coords = { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
        
        if (dragType === 'new' && dragStart) {
          const newX = Math.min(dragStart.x, coords.x);
          const newY = Math.min(dragStart.y, coords.y);
          const newWidth = Math.max(5, Math.abs(coords.x - dragStart.x));
          const newHeight = Math.max(5, Math.abs(coords.y - dragStart.y));
          setTempWindowArea({ x: newX, y: newY, width: newWidth, height: newHeight });
        } else if (dragType === 'move' && dragOffset) {
          const newX = coords.x - dragOffset.x;
          const newY = coords.y - dragOffset.y;
          const clampedX = Math.max(0, Math.min(100 - tempWindowArea.width, newX));
          const clampedY = Math.max(0, Math.min(100 - tempWindowArea.height, newY));
          setTempWindowArea({ ...tempWindowArea, x: clampedX, y: clampedY });
        } else if (dragType === 'resize' && dragStart) {
          // 리사이즈 로직 (터치)
          let newArea = { ...tempWindowArea };
          const resizeDirection = dragOffset?.direction || 'se';
          
          if (resizeDirection.includes('n')) {
            const newHeight = tempWindowArea.height + (tempWindowArea.y - coords.y);
            if (newHeight > 5) {
              newArea.y = coords.y;
              newArea.height = newHeight;
            }
          }
          if (resizeDirection.includes('s')) {
            newArea.height = Math.max(5, coords.y - tempWindowArea.y);
          }
          if (resizeDirection.includes('w')) {
            const newWidth = tempWindowArea.width + (tempWindowArea.x - coords.x);
            if (newWidth > 5) {
              newArea.x = coords.x;
              newArea.width = newWidth;
            }
          }
          if (resizeDirection.includes('e')) {
            newArea.width = Math.max(5, coords.x - tempWindowArea.x);
          }
          
          // 경계 체크
          newArea.x = Math.max(0, Math.min(100 - newArea.width, newArea.x));
          newArea.y = Math.max(0, Math.min(100 - newArea.height, newArea.y));
          
          setTempWindowArea(newArea);
        }
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isWindowAdjustMode) {
        setIsDragging(false);
        setDragStart(null);
        setDragType(null);
        setDragOffset(null);
      }
    };

    if (isWindowAdjustMode) {
      document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isWindowAdjustMode, isDragging, dragType, dragStart, dragOffset, tempWindowArea]);

  const handleWindowSelect = (windowArea: { x: number; y: number; width: number; height: number }) => {
    setWindowArea(windowArea);
  };

  const handleLoadSettings = (settings: any) => {
    if (settings.selectedColor !== undefined) setSelectedColor(settings.selectedColor);
    if (settings.selectedProducts !== undefined) setSelectedProducts(settings.selectedProducts);
    if (settings.materialType !== undefined) setMaterialType(settings.materialType);
    if (settings.patternScale !== undefined) setPatternScale(settings.patternScale);
    if (settings.patternOpacity !== undefined) setPatternOpacity(settings.patternOpacity);
    if (settings.patternAngle !== undefined) setPatternAngle(settings.patternAngle);
    if (settings.patternOffset !== undefined) setPatternOffset(settings.patternOffset);
    if (settings.curtainOpacity !== undefined) setCurtainOpacity(settings.curtainOpacity);
    if (settings.visiblePleats !== undefined) setVisiblePleats(settings.visiblePleats);
    if (settings.waveDepth !== undefined) setWaveDepth(settings.waveDepth);
    if (settings.indoorLight !== undefined) setIndoorLight(settings.indoorLight);
    if (settings.sunLight !== undefined) setSunLight(settings.sunLight);
    if (settings.curtainOpen !== undefined) setCurtainOpen(settings.curtainOpen);
    if (settings.curtainWidth !== undefined) setCurtainWidth(settings.curtainWidth);
    if (settings.windowArea !== undefined) setWindowArea(settings.windowArea);
    if (settings.colorLightness !== undefined) setColorLightness(settings.colorLightness);
    if (settings.colorSaturation !== undefined) setColorSaturation(settings.colorSaturation);
    if (settings.colorHue !== undefined) setColorHue(settings.colorHue);
    if (settings.pleatContrast !== undefined) setPleatContrast(settings.pleatContrast);
  };

  // 창 위치 조정 시작
  const startWindowAdjust = () => {
    setIsWindowAdjustMode(true);
    // setTempWindowArea(windowArea); // 항상 초기화하지 않음
  };

  // 창 위치 조정 완료
  const finishWindowAdjust = () => {
    setIsWindowAdjustMode(false);
    setIsWindowTouched(true);
    setWindowArea(tempWindowArea); // 조정된 창 위치를 windowArea에 반영
  };

  // 창 위치 조정 취소
  const cancelWindowAdjust = () => {
    setTempWindowArea(windowArea);
    setIsWindowAdjustMode(false);
    setIsDragging(false);
    setDragStart(null);
    setDragType(null);
    setDragOffset(null);
  };

  // 더블클릭으로 조정 모드 진입
  const handleDoubleClick = () => {
    if (!isWindowAdjustMode) {
      startWindowAdjust();
    }
  };

  // ESC 키로 조정 모드 종료
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWindowAdjustMode) {
        cancelWindowAdjust();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isWindowAdjustMode]);

  // 마우스/터치 좌표를 퍼센트로 변환
  const getPercentCoordinates = (e: React.MouseEvent | React.TouchEvent, container: HTMLElement) => {
    const rect = container.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  // 창 영역 클릭으로 이동 (직관적 방식)
  const handleWindowClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isWindowAdjustMode || isDragging) return; // 드래그 중이면 클릭 무시
    
    // 마우스 이벤트의 경우에만 preventDefault 호출
    if (!('touches' in e)) {
      e.preventDefault();
    }
    e.stopPropagation();
    
    const container = containerRef.current;
    if (!container) return;
    
    const coords = getPercentCoordinates(e, container);
    
    // 창 영역의 중심을 클릭한 위치로 이동
    const newX = coords.x - (tempWindowArea.width / 2);
    const newY = coords.y - (tempWindowArea.height / 2);
    
    // 경계 체크
    const clampedX = Math.max(0, Math.min(100 - tempWindowArea.width, newX));
    const clampedY = Math.max(0, Math.min(100 - tempWindowArea.height, newY));
    
    setTempWindowArea({ ...tempWindowArea, x: clampedX, y: clampedY });
  };

  // 창 영역 드래그 시작
  const handleWindowDragStart = (e: React.MouseEvent | React.TouchEvent, type: 'move' | 'resize' | 'new') => {
    if (!isWindowAdjustMode) return;
    
    // 마우스 이벤트의 경우에만 preventDefault 호출
    if (!('touches' in e)) {
      e.preventDefault();
    }
    e.stopPropagation();
    
    const container = containerRef.current;
    if (!container) return;
    
    const coords = getPercentCoordinates(e, container);
    
    setIsDragging(true);
    setDragStart(coords);
    setDragType(type);
    
    if (type === 'move') {
      // 이동 시 현재 창 영역과 클릭 위치의 차이를 저장
      setDragOffset({
        x: coords.x - tempWindowArea.x,
        y: coords.y - tempWindowArea.y
      });
    }
  };

  // 창 영역 크기 조정 (전역 이벤트로 처리)
  const handleResize = (e: React.MouseEvent | React.TouchEvent, direction: string) => {
    if (!isWindowAdjustMode) return;
    
    // 마우스 이벤트의 경우에만 preventDefault 호출
    if (!('touches' in e)) {
      e.preventDefault();
    }
    e.stopPropagation();
    
    const container = containerRef.current;
    if (!container) return;
    
    const coords = getPercentCoordinates(e, container);
    
    setIsDragging(true);
    setDragStart(coords);
    setDragType('resize');
    setDragOffset({ x: 0, y: 0, direction }); // 리사이즈용 오프셋에 방향 저장
  };

  // 창 위치 선택 모달
  const WindowSelectionModal = () => {
    console.log("모달 상태:", { showWindowModal, photo: !!photo });
    if (!showWindowModal || !photo) return null;

    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.8)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}>
        <div style={{
          background: "white",
          borderRadius: "16px",
          maxWidth: "90vw",
          maxHeight: "90vh",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
        }}>
          {/* 모달 헤더 */}
          <div style={{
            padding: "1.5rem 2rem",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h2 style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#1f2937"
            }}>
              🪟 창 위치 선택
            </h2>
            <button
              onClick={() => setShowWindowModal(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#64748b",
                padding: "0.5rem",
                borderRadius: "8px",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f5f9"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              ✕
            </button>
          </div>
          
          {/* 모달 내용 */}
          <div style={{
            padding: "2rem",
            maxHeight: "calc(90vh - 120px)",
            overflow: "auto"
          }}>
            <div style={{
              background: "#f8fafc",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              border: "1px solid #e2e8f0"
            }}>
              <p style={{
                margin: 0,
                fontSize: "0.95rem",
                color: "#374151",
                lineHeight: "1.5"
              }}>
                사진에서 창이 있는 위치를 클릭하거나 드래그하여 선택하세요.<br/>
                선택한 영역에 커튼이 적용됩니다.
              </p>
            </div>
            
            <WindowSelector 
              photo={photo} 
              onWindowSelect={(area) => {
                handleWindowSelect(area);
                setShowWindowModal(false);
              }} 
              hideTitle 
            />
          </div>
          
          {/* 모달 푸터 */}
          <div style={{
            padding: "1.5rem 2rem",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem"
          }}>
            <button
              onClick={() => setShowWindowModal(false)}
              style={{
                padding: "0.75rem 1.5rem",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "white",
                color: "#374151",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "500",
                transition: "all 0.2s"
              }}
            >
              취소
            </button>
            <button
              onClick={() => setShowWindowModal(false)}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "8px",
                background: "#3b82f6",
                color: "white",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "500",
                transition: "all 0.2s"
              }}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    );
  };

  function saveTemplate() {
    if (!templateName.trim()) return;
    const template = {
      name: templateName.trim(),
      settings: {
        selectedColor,
        selectedProducts,
        materialType,
        patternScale,
        patternOpacity,
        patternAngle,
        patternOffset,
        curtainOpacity,
        visiblePleats,
        waveDepth,
        indoorLight,
        sunLight,
        curtainWidth,
        curtainOpen,
        windowArea,
      }
    };
    const prev = JSON.parse(localStorage.getItem("curtainTemplates") || "[]");
    localStorage.setItem("curtainTemplates", JSON.stringify([...prev, template]));
    setShowTemplateModal(false);
    setTemplateName("");
    setSaveMessage("템플릿이 저장되었습니다!");
    setTimeout(() => setSaveMessage(""), 2000);
  }

  function loadTemplate(settings: any) {
    if (!settings) return;
    setSelectedColor(settings.selectedColor);
    setSelectedProducts(settings.selectedProducts);
    setMaterialType(settings.materialType);
    setPatternScale(settings.patternScale);
    setPatternOpacity(settings.patternOpacity);
    setPatternAngle(settings.patternAngle);
    setPatternOffset(settings.patternOffset);
    setCurtainOpacity(settings.curtainOpacity);
    setVisiblePleats(settings.visiblePleats);
    setWaveDepth(settings.waveDepth);
    setIndoorLight(settings.indoorLight);
    setSunLight(settings.sunLight);
    setCurtainWidth(settings.curtainWidth);
    setCurtainOpen(settings.curtainOpen);
    setWindowArea(settings.windowArea);
    setShowLoadModal(false);
    setSaveMessage("템플릿이 불러와졌습니다!");
    setTimeout(() => setSaveMessage(""), 2000);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* 상단: 미리보기 영역 (고정) */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.8)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: 0
        }}>
          {photo ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem"
            }}>
              {/* 미리보기 프레임 */}
              <div id="simulator-root" className="curtain-preview-frame" style={{
                width: "100%",
                height: "445px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                background: "white",
                position: "relative",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                paddingLeft: 0,
                paddingRight: 0
              }}>
                {/* 사진 미리보기 - 캡처 영역 */}
                <div 
                  ref={containerRef}
                  id="simulation-capture" 
                  style={{ 
                    flex: 1, 
                    width: "100%", 
                    height: "100%",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    background: "white",
                    cursor: isWindowAdjustMode ? "crosshair" : "default"
                  }}
                  onMouseDown={(e) => {
                    if (!isWindowAdjustMode) {
                      setIsWindowAdjustMode(true);
                      setIsWindowTouched(true);
                    } else {
                      e.stopPropagation();
                      handleWindowDragStart(e, 'move');
                    }
                  }}
                  onTouchStart={(e) => {
                    if (!isWindowAdjustMode) {
                      setIsWindowAdjustMode(true);
                      setIsWindowTouched(true);
                    } else {
                      e.stopPropagation();
                      handleWindowDragStart(e, 'move');
                    }
                  }}
                  onDoubleClick={handleDoubleClick}
                >
                  {/* 중앙 워터마크 문구 */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    zIndex: 10,
                    pointerEvents: "none",
                    userSelect: "none",
                    opacity: 0.7,
                    textShadow: "0 6px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)"
                  }}>
                    윈도우갤러리 031.205.2056
                  </div>
                  
                  {/* 조정 모드 안내 메시지 */}
                  {isWindowAdjustMode && (
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(0, 0, 0, 0.8)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      zIndex: 30,
                      pointerEvents: "none",
                      userSelect: "none"
                    }}>
                      💡 클릭으로 이동 • 모서리/테두리 드래그로 크기조정 • 확인(종료)
                    </div>
                  )}
                  
                  {/* 창 위치 조정 모드일 때 창 영역 표시 */}
                  {(isWindowAdjustMode || !isWindowTouched) && (
                    <div
                      style={{
                        position: "absolute",
                        left: `${tempWindowArea.x}%`,
                        top: `${tempWindowArea.y}%`,
                        width: `${tempWindowArea.width}%`,
                        height: `${tempWindowArea.height}%`,
                        border: "3px solid #3b82f6",
                        borderRadius: "8px",
                        background: "rgba(59, 130, 246, 0.1)",
                        cursor: isWindowAdjustMode ? "move" : "pointer",
                        zIndex: 20,
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
                        userSelect: "none",
                        pointerEvents: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      onMouseDown={e => {
                        if (!isWindowAdjustMode) {
                          setIsWindowAdjustMode(true);
                          setIsWindowTouched(true);
                        } else {
                          e.stopPropagation();
                          handleWindowDragStart(e, 'move');
                        }
                      }}
                      onTouchStart={e => {
                        if (!isWindowAdjustMode) {
                          setIsWindowAdjustMode(true);
                          setIsWindowTouched(true);
                        } else {
                          e.stopPropagation();
                          handleWindowDragStart(e, 'move');
                        }
                      }}
                    >
                      {/* 안내 문구 */}
                      {!isWindowAdjustMode && !isWindowTouched && (
                        <span style={{
                          color: "#2563eb",
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          background: "rgba(255,255,255,0.85)",
                          borderRadius: 12,
                          padding: "0.7em 1.2em",
                          boxShadow: "0 2px 8px rgba(59,130,246,0.08)",
                          pointerEvents: "none"
                        }}>
                          이곳을 터치하세요
                        </span>
                      )}
                      {/* 확인 버튼 (조절 모드에서만) */}
                      {isWindowAdjustMode && (
                        <button
                          onClick={finishWindowAdjust}
                          style={{
                            position: "absolute",
                            bottom: 12,
                            right: 12,
                            padding: "0.6em 1.4em",
                            border: "none",
                            borderRadius: "8px",
                            background: "#2563eb",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "1rem",
                            boxShadow: "0 2px 8px rgba(59,130,246,0.12)",
                            cursor: "pointer",
                            zIndex: 30
                          }}
                        >
                          확인
                        </button>
                      )}
                      {/* 상단 라인 */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-12px",
                          left: 0,
                          right: 0,
                          height: "24px",
                          cursor: "ns-resize",
                          background: "transparent"
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'n');
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'n');
                        }}
                      />
                      {/* 하단 라인 */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-12px",
                          left: 0,
                          right: 0,
                          height: "24px",
                          cursor: "ns-resize",
                          background: "transparent"
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleResize(e, 's');
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleResize(e, 's');
                        }}
                      />
                      {/* 좌측 라인 */}
                      <div
                        style={{
                          position: "absolute",
                          left: "-12px",
                          top: 0,
                          bottom: 0,
                          width: "24px",
                          cursor: "ew-resize",
                          background: "transparent"
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'w');
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'w');
                        }}
                      />
                      {/* 우측 라인 */}
                      <div
                        style={{
                          position: "absolute",
                          right: "-12px",
                          top: 0,
                          bottom: 0,
                          width: "24px",
                          cursor: "ew-resize",
                          background: "transparent"
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'e');
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'e');
                        }}
                      />
                      
                      {/* 모서리 핸들들 - 더 크게 */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-16px",
                          left: "-16px",
                          width: "32px",
                          height: "32px",
                          background: "#3b82f6",
                          borderRadius: "50%",
                          cursor: "nwse-resize",
                          border: "3px solid white",
                          zIndex: 21,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'nw');
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'nw');
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "-16px",
                          right: "-16px",
                          width: "32px",
                          height: "32px",
                          background: "#3b82f6",
                          borderRadius: "50%",
                          cursor: "nesw-resize",
                          border: "3px solid white",
                          zIndex: 21,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'ne');
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'ne');
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-16px",
                          left: "-16px",
                          width: "32px",
                          height: "32px",
                          background: "#3b82f6",
                          borderRadius: "50%",
                          cursor: "nesw-resize",
                          border: "3px solid white",
                          zIndex: 21,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'sw');
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'sw');
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-16px",
                          right: "-16px",
                          width: "32px",
                          height: "32px",
                          background: "#3b82f6",
                          borderRadius: "50%",
                          cursor: "nwse-resize",
                          border: "3px solid white",
                          zIndex: 21,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'se');
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleResize(e, 'se');
                        }}
                      />
                    </div>
                  )}
                  
                  <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <SimulationScene
                      photo={photo}
                      windowArea={tempWindowArea}
                      selectedProducts={selectedProducts}
                      curtainOpen={curtainOpen}
                      selectedColor={selectedColor}
                      curtainWidth={curtainWidth}
                      waveDepth={waveDepth}
                      waveCount={Math.round(visiblePleats * 1.6)}
                      curtainOpacity={curtainOpacity}
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
                      shadowStrength={shadowStrength}
                      shadowColor={shadowColor}
                      shadowBlur={shadowBlur}
                      shadowHeight={shadowHeight}
                      onCurtainClick={startWindowAdjust}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem"
            }}>
              {/* 사진 업로드 전 안내 프레임 */}
              <div className="curtain-preview-frame" style={{
                width: "100%",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                fontSize: "1.13rem",
                fontWeight: "500",
                borderRadius: "16px",
                border: "2px dashed #cbd5e1",
                background: "#f8fafc",
                padding: "1.5em 1.2em"
              }}>
                <div style={{marginBottom:'0.7em',fontWeight:700,color:'#222',fontSize:'1.13em'}}>사용 설명</div>
                <ol style={{margin:0, paddingLeft:'1.2em', marginBottom:'0.7em', color:'#333', fontSize:'1.02em', fontWeight:600, lineHeight:1.7}}>
                  <li>가로형 사진 추천드립니다. <span style={{color:'#d72660',fontWeight:700}}>(16:9, 4:3 등 ..)</span></li>
                  <li>정면에서 촬영해주세요. <span style={{color:'#d72660',fontWeight:700}}>(대각선 X)</span></li>
                  <li>이미지 저장은 각 기기의 <span style={{color:'#6c3483',fontWeight:700}}>캡쳐 기능</span> 이용하세요.</li>
                </ol>
                <div style={{marginBottom:'0.5em',color:'#555',fontSize:'0.98em',fontWeight:500}}>커튼 구입전 단순히 컬러매칭 해보는 프로그램입니다.</div>
                <div style={{marginBottom:'1.2em',color:'#d72660',fontWeight:600,fontSize:'0.99em'}}>커튼 구입 상담은 윈도우갤러리로 연락주세요 (031.205.2056)</div>
                <div style={{marginTop:'0.7em',marginBottom:'0.2em',fontWeight:900,fontSize:'1.18em',color:'#059669',letterSpacing:'-0.01em',textAlign:'center'}}>사진을 업로드하여<br/>커튼 시뮬레이션을 시작하세요!</div>
                <div style={{fontSize:'2.2em',color:'#059669',marginTop:'-0.2em',marginBottom:'-0.2em',fontWeight:900,letterSpacing:'-0.05em',textAlign:'center'}}>↓</div>
              </div>

              {/* 사진 선택하기 버튼 */}
              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <UploadPhoto onUpload={setPhoto} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단: 설정 패널 (스크롤로 접근) */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "230px 1rem 2rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "1.5rem"
        }}
      >
        {/* 광고 배너: 메뉴와 같은 레이어, 한 줄 전체 */}
        {photo && (
          <div style={{
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.5rem',
            marginTop: '-2.5rem',
            pointerEvents: 'auto'
          }}>
            <a href="https://blog.naver.com/windowgallery" target="_blank" rel="noopener noreferrer" style={{width: '100%', maxWidth: '1200px', display: 'block', position: 'relative'}}>
              <img src="/banner.jpg" alt="광고 배너" style={{
                width: "100%",
                maxWidth: "1200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: 16,
                boxShadow: "0 2px 16px rgba(40,40,40,0.10)",
                display: 'block'
              }} />
              <span style={{
                position: 'absolute',
                left: 24,
                bottom: 18,
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.18rem',
                textShadow: '0 2px 8px rgba(0,0,0,0.38), 0 1px 2px #000',
                letterSpacing: '0.01em',
                userSelect: 'none',
                pointerEvents: 'none'
              }}>
                시공사례 보러가기
              </span>
            </a>
          </div>
        )}

        {/* 주요 컨트롤 (사진 밑 버튼들을 여기로 이동) */}
        {photo && (
          <div style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
            padding: "0.7rem 1rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            gridColumn: "1 / -1"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap"
            }}>
              {/* 왼쪽: 커튼 타입 선택 */}
              <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", flexWrap: "wrap" }}>
                {['겉커튼', '속커튼'].map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      const product = sampleCurtains.find(p => p.type === type);
                      if (product) {
                        setSelectedProducts([product]);
                        setSelectedColor(null);
                      }
                    }}
                    style={{
                      padding: "0.5rem 1rem",
                      border: selectedProducts[0]?.type === type ? "2px solid #3b82f6" : "1px solid #cbd5e1",
                      borderRadius: "8px",
                      background: selectedProducts[0]?.type === type ? "#3b82f6" : "white",
                      color: selectedProducts[0]?.type === type ? "white" : "#374151",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      minWidth: "80px"
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              {/* 중앙: 커튼 개방 슬라이더 */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 160, flex: "1 1 auto" }}>
                <label style={{ 
                  display: "block", 
                  fontWeight: "600", 
                  marginBottom: "0.5rem", 
                  fontSize: "0.99rem", 
                  textAlign: "center",
                  color: "#374151"
                }}>
                  커튼 개방: {curtainOpen}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={curtainOpen}
                  onChange={e => setCurtainOpen(Number(e.target.value))}
                  style={{ 
                    width: "100%",
                    maxWidth: "180px",
                    height: "6px",
                    borderRadius: "3px",
                    background: "#e2e8f0",
                    outline: "none"
                  }}
                />
              </div>
              
              {/* 오른쪽: 액션 버튼들 */}
              <div style={{ display: "flex", flexDirection: "row", gap: "0.75rem", flexWrap: "wrap" }}>
                <UploadPhoto onUpload={setPhoto} />
                <button
                  onClick={() => setShowTemplateModal(true)}
                  style={{
                    padding: "0.5rem 1.1rem",
                    border: "1px solid #3b82f6",
                    borderRadius: "8px",
                    background: "white",
                    color: "#3b82f6",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  템플릿 저장하기
                </button>
                <button
                  onClick={() => setShowLoadModal(true)}
                  style={{
                    padding: "0.5rem 1.1rem",
                    border: "1px solid #64748b",
                    borderRadius: "8px",
                    background: "white",
                    color: "#64748b",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  title="템플릿 불러오기"
                >
                  불러오기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 색상 선택 */}
        {photo && (
          <div style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
            padding: "1.5rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            overflow: "visible"
          }}>
            <h3 style={{
              margin: "0 0 1.5rem 0",
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#1f2937"
            }}>
              🌈 색상 선택
            </h3>
            <ColorSelector
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
              hideLabel
            />
          </div>
        )}

        {/* 패턴/질감 설정 (2열) */}
        {photo && (
          <div style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
            padding: "1.5rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(226, 232, 240, 0.8)"
          }}>
            <h3 style={{
              margin: "0 0 1.5rem 0",
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#1f2937"
            }}>
              🧵 패턴/질감 설정
            </h3>
            {/* 패턴/질감 버튼 그룹 */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.2rem" }}>
              {[
                { value: "plain", label: "기본" },
                { value: "linen", label: "린넨" },
                { value: "suede", label: "스웨이드" },
                { value: "velvet", label: "벨벳" },
                { value: "square", label: "사각" },
                { value: "dot", label: "도트" },
                { value: "herringbone", label: "헤링본" },
                { value: "stripe", label: "스트라이프" },
                { value: "wave", label: "웨이브" },
                { value: "tweed", label: "트위드" },
                { value: "check", label: "체크" }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setMaterialType(opt.value as typeof materialType)}
                  style={{
                    padding: "0.5rem 1.2rem",
                    border: materialType === opt.value ? "2px solid #3b82f6" : "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: materialType === opt.value ? "#3b82f6" : "white",
                    color: materialType === opt.value ? "white" : "#374151",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {/* 패턴 슬라이더들 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              <label>
                패턴 크기
                <input
                  type="range"
                  min={1}
                  max={25}
                  value={patternScale}
                  onChange={e => setPatternScale(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{patternScale}</span>
              </label>
              <label>
                패턴 진하기
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={patternOpacity}
                  onChange={e => setPatternOpacity(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{patternOpacity}</span>
              </label>
              <label>
                패턴 각도
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={patternAngle}
                  onChange={e => setPatternAngle(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{patternAngle}°</span>
              </label>
              <label>
                패턴 오프셋
                <input
                  type="range"
                  min={-20}
                  max={20}
                  value={patternOffset}
                  onChange={e => setPatternOffset(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{patternOffset}</span>
              </label>
            </div>
          </div>
        )}

        {/* 커튼 상세 설정 (조명, 채광, 커튼 높이, 투명도, 주름개수, 주름깊이 등) */}
        {photo && (
          <div style={{ 
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "16px", 
            padding: "1.5rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(226, 232, 240, 0.8)"
          }}>
            <h3 style={{ 
              margin: "0 0 1.5rem 0", 
              fontSize: "1.1rem", 
              fontWeight: "600",
              color: "#1f2937"
            }}>
              🛠️ 커튼 상세 설정
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {/* 투명도 */}
              <label>
                투명도
                <input
                  type="range"
                  min={0.7}
                  max={1.05}
                  step={0.01}
                  value={curtainOpacity}
                  onChange={e => setCurtainOpacity(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{Math.round(curtainOpacity * 100)}%</span>
              </label>
              {/* 주름개수 */}
              <label>
                주름 개수
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={visiblePleats}
                  onChange={e => setVisiblePleats(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{visiblePleats}</span>
              </label>
              {/* 주름깊이 */}
              <label>
                주름 깊이
                <input
                  type="range"
                  min={0}
                  max={5}
                  value={waveDepth}
                  onChange={e => setWaveDepth(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{waveDepth}</span>
              </label>
              {/* 조명 */}
              <label>
                조명
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={indoorLight}
                  onChange={e => setIndoorLight(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{indoorLight}%</span>
              </label>
              {/* 채광 */}
              <label>
                채광
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sunLight}
                  onChange={e => setSunLight(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{sunLight}%</span>
              </label>
              {/* 명도/채도/색상/주름명암 조절바 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginTop: '0.7rem' }}>
                <label>
                  명도
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={colorLightness}
                    onChange={e => setColorLightness(Number(e.target.value))}
                    style={{ width: 120, marginLeft: 8 }}
                  />
                  <span style={{ marginLeft: 8 }}>{colorLightness}</span>
                </label>
                <label>
                  채도
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={colorSaturation}
                    onChange={e => setColorSaturation(Number(e.target.value))}
                    style={{ width: 120, marginLeft: 8 }}
                  />
                  <span style={{ marginLeft: 8 }}>{colorSaturation}</span>
                </label>
                <label>
                  색상
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    value={colorHue}
                    onChange={e => setColorHue(Number(e.target.value))}
                    style={{ width: 120, marginLeft: 8 }}
                  />
                  <span style={{ marginLeft: 8 }}>{colorHue}</span>
                </label>
                <label>
                  주름 명암
                  <input
                    type="range"
                    min={0.5}
                    max={4}
                    step={0.01}
                    value={pleatContrast}
                    onChange={e => setPleatContrast(Number(e.target.value))}
                    style={{ width: 120, marginLeft: 8 }}
                  />
                  <span style={{ marginLeft: 8 }}>{pleatContrast}</span>
                </label>
              </div>
              {/* 하단 그림자 설정 */}
              <label>
                그림자 강도
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={shadowStrength}
                  onChange={e => setShadowStrength(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{shadowStrength}</span>
              </label>
              <label>
                그림자 색상
                <input
                  type="color"
                  value={shadowColor}
                  onChange={e => setShadowColor(e.target.value)}
                  style={{ marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{shadowColor}</span>
              </label>
              <label>
                그림자 번짐
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={shadowBlur}
                  onChange={e => setShadowBlur(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{shadowBlur}px</span>
              </label>
              <label>
                그림자 크기(높이)
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={shadowHeight}
                  onChange={e => setShadowHeight(Number(e.target.value))}
                  style={{ width: 120, marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{shadowHeight}%</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 창 위치 선택 모달 */}
      {showWindowModal && (
        <WindowSelectionModal />
      )}

      {/* 템플릿 이름 입력 모달 */}
      {showTemplateModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.18)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "white",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            padding: "2rem 2.5rem",
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h3 style={{ marginBottom: 18, fontWeight: 700, fontSize: "1.1rem" }}>템플릿 이름을 입력하세요</h3>
            <input
              value={templateName}
              onChange={e => setTemplateName(e.target.value)}
              placeholder="예: 거실_그린커튼"
              style={{
                fontSize: "1rem",
                padding: "0.7em 1.2em",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
                marginBottom: 18,
                width: 220
              }}
              autoFocus
              onKeyDown={e => { if (e.key === "Enter") saveTemplate(); }}
            />
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={saveTemplate}
                style={{
                  padding: "0.5rem 1.2rem",
                  border: "none",
                  borderRadius: 8,
                  background: "#3b82f6",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer"
                }}
              >
                저장
              </button>
              <button
                onClick={() => setShowTemplateModal(false)}
                style={{
                  padding: "0.5rem 1.2rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: 8,
                  background: "white",
                  color: "#374151",
                  fontWeight: 500,
                  fontSize: "1rem",
                  cursor: "pointer"
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 템플릿 불러오기 모달 */}
      {showLoadModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.18)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "white",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            padding: "2rem 2.5rem",
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h3 style={{ marginBottom: 18, fontWeight: 700, fontSize: "1.1rem" }}>저장된 템플릿 불러오기</h3>
            <div style={{ maxHeight: 260, overflowY: "auto", width: "100%", marginBottom: 18 }}>
              {(JSON.parse(localStorage.getItem("curtainTemplates") || "[]") as any[]).length === 0 ? (
                <div style={{ color: "#64748b", fontSize: "1rem", textAlign: "center" }}>저장된 템플릿이 없습니다.</div>
              ) : (
                (JSON.parse(localStorage.getItem("curtainTemplates") || "[]") as any[]).map((tpl, idx) => (
                  <button
                    key={tpl.name + idx}
                    onClick={() => loadTemplate(tpl.settings)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.7em 1.2em",
                      marginBottom: 8,
                      border: "1px solid #cbd5e1",
                      borderRadius: 8,
                      background: "#f8fafc",
                      color: "#1f2937",
                      fontWeight: 500,
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                  >
                    {tpl.name}
                  </button>
                ))
              )}
            </div>
            <button
              onClick={() => setShowLoadModal(false)}
              style={{
                padding: "0.5rem 1.2rem",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                background: "white",
                color: "#374151",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 저장 완료 메시지 */}
      {saveMessage && (
        <div style={{
          position: "fixed",
          top: 32,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#3b82f6",
          color: "white",
          padding: "0.8em 2em",
          borderRadius: 12,
          fontWeight: 600,
          fontSize: "1.05rem",
          zIndex: 9999,
          boxShadow: "0 4px 16px rgba(59,130,246,0.18)"
        }}>
          {saveMessage}
        </div>
      )}
    </div>
  );
};

export default CurtainSimulator; 