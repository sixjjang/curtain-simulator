// components/WindowSelector.tsx
import React, { useState, useRef, useEffect } from "react";

interface WindowSelectorProps {
  photo?: string | null;
  onWindowSelect?: (windowArea: { x: number; y: number; width: number; height: number }) => void;
  hideTitle?: boolean;
}

// 모바일에서 더 큰 드래그 영역을 위해 핸들 크기 증가
const HANDLE_SIZE = 20; // 14에서 20으로 증가
const HANDLE_OFFSET = HANDLE_SIZE / 2;

// Helper to clamp values between min and max
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

const DEFAULT_WINDOW = { x: 15, y: 15, width: 70, height: 70 };

const WindowSelector: React.FC<WindowSelectorProps> = ({ photo, onWindowSelect, hideTitle }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [selectedWindow, setSelectedWindow] = useState<{ x: number; y: number; width: number; height: number } | null>(
    photo ? DEFAULT_WINDOW : null
  );
  const imageRef = useRef<HTMLImageElement>(null);
  const [resizeDir, setResizeDir] = useState<string | null>(null); // e.g. 'nw', 'n', 'ne', 'e', etc.
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  // 안내 메시지 및 확인 버튼 표시 상태
  const [showGuide, setShowGuide] = useState(true); // 최초 1회만 true
  const [confirmed, setConfirmed] = useState(false); // 확인 시 true

  if (!photo) {
    return (
      <div style={{
        border: "1px solid #e5e7eb",
        padding: "1rem",
        borderRadius: "12px",
        backgroundColor: "#f9fafb",
        textAlign: "center"
      }}>
        {!hideTitle && (
          <>
            <h3 style={{ fontWeight: "bold", fontSize: "1.125rem", marginBottom: "0.5rem" }}>
              🪟 창 선택
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              사진을 먼저 업로드해주세요
            </p>
          </>
        )}
      </div>
    );
  }

  const getImageCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if (!imageRef.current) return { x: 0, y: 0 };
    
    const rect = imageRef.current.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      // 터치 이벤트
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // 마우스 이벤트
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const coords = getImageCoordinates(e);
    setDragStart(coords);
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // 기본 터치 동작 방지
    const coords = getImageCoordinates(e);
    setDragStart(coords);
    setIsDragging(true);
  };

  const handleHandleMouseDown = (dir: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setResizeDir(dir);
    setIsDragging(true);
    setDragStart(getImageCoordinates(e));
  };

  const handleHandleTouchStart = (dir: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResizeDir(dir);
    setIsDragging(true);
    setDragStart(getImageCoordinates(e));
  };

  const handleOverlayMouseDown = (e: React.MouseEvent) => {
    if (!selectedWindow) return;
    e.stopPropagation();
    setIsDragging(true);
    setResizeDir(null);
    const mouse = getImageCoordinates(e);
    setDragOffset({
      x: mouse.x - selectedWindow.x,
      y: mouse.y - selectedWindow.y
    });
  };

  const handleOverlayTouchStart = (e: React.TouchEvent) => {
    if (!selectedWindow) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setResizeDir(null);
    const touch = getImageCoordinates(e);
    setDragOffset({
      x: touch.x - selectedWindow.x,
      y: touch.y - selectedWindow.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const mouse = getImageCoordinates(e);
    if (resizeDir && selectedWindow && dragStart) {
      // Resizing
      let { x, y, width, height } = selectedWindow;
      const minSize = 5;
      let nx = x, ny = y, nw = width, nh = height;
      if (resizeDir.includes('n')) {
        nh = clamp(height + (y - mouse.y), minSize, 100 - y);
        ny = clamp(mouse.y, 0, y + height - minSize);
      }
      if (resizeDir.includes('s')) {
        nh = clamp(mouse.y - y, minSize, 100 - y);
      }
      if (resizeDir.includes('w')) {
        nw = clamp(width + (x - mouse.x), minSize, 100 - x);
        nx = clamp(mouse.x, 0, x + width - minSize);
      }
      if (resizeDir.includes('e')) {
        nw = clamp(mouse.x - x, minSize, 100 - x);
      }
      setSelectedWindow({ x: nx, y: ny, width: nw, height: nh });
      if (onWindowSelect) onWindowSelect({ x: nx, y: ny, width: nw, height: nh });
    } else if (isDragging && dragOffset && selectedWindow) {
      // Dragging
      let nx = clamp(mouse.x - dragOffset.x, 0, 100 - selectedWindow.width);
      let ny = clamp(mouse.y - dragOffset.y, 0, 100 - selectedWindow.height);
      setSelectedWindow({ ...selectedWindow, x: nx, y: ny });
      if (onWindowSelect) onWindowSelect({ ...selectedWindow, x: nx, y: ny });
    } else if (isDragging && dragStart) {
      // Initial selection (drag to create)
      const coords = mouse;
      const x = Math.min(dragStart.x, coords.x);
      const y = Math.min(dragStart.y, coords.y);
      const width = Math.abs(coords.x - dragStart.x);
      const height = Math.abs(coords.y - dragStart.y);
      const windowArea = { x, y, width, height };
      setSelectedWindow(windowArea);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && selectedWindow && onWindowSelect) {
      onWindowSelect(selectedWindow);
    }
    setIsDragging(false);
    setResizeDir(null);
    setDragStart(null);
    setDragOffset(null);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  // 마우스와 터치 이벤트를 window에 바인딩
  useEffect(() => {
    if (!isDragging) return;
    
    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      handleMouseMove(e as any);
    };
    const handleUp = () => handleMouseUp();
    const handleTouchEnd = () => handleMouseUp();
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    if (photo) setSelectedWindow(DEFAULT_WINDOW);
    else setSelectedWindow(null);
  }, [photo]);

  // 최초 1회만 안내 메시지
  useEffect(() => {
    setShowGuide(true);
    setConfirmed(false);
  }, [photo]);

  return (
    <div style={{
      border: "1px solid #e5e7eb",
      padding: "1rem",
      borderRadius: "12px",
      backgroundColor: "white"
    }}>
      {!hideTitle && (
        <>
          <h3 style={{ fontWeight: "bold", fontSize: "1.125rem", marginBottom: "0.5rem" }}>
            🪟 창 선택
          </h3>
          <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
            사진에서 창이 있는 위치를 클릭하거나 드래그하여 선택하세요
          </p>
          <div style={{ 
            background: "#f0f9ff", 
            border: "1px solid #0ea5e9", 
            borderRadius: "8px", 
            padding: "0.75rem", 
            marginBottom: "1rem",
            fontSize: "0.875rem",
            color: "#0369a1"
          }}>
            <strong>📱 모바일 사용법:</strong>
            <ul style={{ margin: "0.5rem 0 0 0", paddingLeft: "1.5rem" }}>
              <li>창 영역을 터치하고 드래그하여 이동</li>
              <li>테두리나 모서리를 터치하여 크기 조정</li>
              <li>빨간 점(모서리)을 터치하여 대각선 크기 조정</li>
            </ul>
          </div>
        </>
      )}
      <div
        style={{ position: "relative", width: "100%", maxWidth: "600px", margin: "0 auto" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          ref={imageRef}
          src={photo} 
          alt="업로드된 사진" 
          style={{ 
            width: "100%", 
            display: "block",
            cursor: isDragging ? "crosshair" : "pointer",
            borderRadius: "8px",
            userSelect: "none",
            touchAction: "none" // 터치 동작 제어
          }}
          onClick={handleMouseDown}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
        
        {selectedWindow && !confirmed && (
          <div
            style={{
              position: "absolute",
              left: `${selectedWindow.x}%`,
              top: `${selectedWindow.y}%`,
              width: `${selectedWindow.width}%`,
              height: `${selectedWindow.height}%`,
              border: "2.5px solid #1d4ed8",
              boxSizing: "border-box",
              borderRadius: "8px",
              background: isDragging ? "rgba(37,99,235,0.18)" : "rgba(37,99,235,0.12)",
              cursor: resizeDir ? `${resizeDir}-resize` : (isDragging ? "move" : "move"),
              zIndex: 2,
              transition: "box-shadow 0.2s",
              boxShadow: isDragging ? "0 0 0 3px #1d4ed888" : "0 2px 12px rgba(30,64,175,0.10)",
              userSelect: "none",
              touchAction: "none"
            }}
            onMouseDown={handleOverlayMouseDown}
            onTouchStart={handleOverlayTouchStart}
          >
            {/* 안내 메시지: showGuide가 true일 때만 */}
            {showGuide && (
              <div style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(255,255,255,0.95)",
                borderRadius: 12,
                padding: "0.7em 1.2em",
                fontSize: 20,
                color: "#2563eb",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(30,64,175,0.10)",
                zIndex: 10
              }}>
                이곳을 터치하세요
              </div>
            )}
            {/* 확인 버튼: showGuide가 true일 때만 */}
            {showGuide && (
              <button
                style={{
                  position: "absolute",
                  right: 12,
                  bottom: 12,
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.5em 1.2em",
                  fontSize: 16,
                  fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(30,64,175,0.10)",
                  cursor: "pointer",
                  zIndex: 11
                }}
                onClick={e => {
                  e.stopPropagation();
                  setShowGuide(false);
                  setConfirmed(true);
                }}
              >
                확인
              </button>
            )}
            {/* 상단 라인 드래그 영역 - 모바일에서 더 크게 */}
            <div
              style={{
                position: "absolute", 
                left: 0, 
                top: -12, 
                width: "100%", 
                height: 24, 
                cursor: "ns-resize", 
                zIndex: 3,
                touchAction: "none",
                background: "rgba(29, 78, 216, 0.1)",
                borderTop: "2px solid #1d4ed8",
                borderRadius: "4px 4px 0 0"
              }}
              onMouseDown={e => handleHandleMouseDown('n')(e)}
              onTouchStart={e => handleHandleTouchStart('n')(e)}
            />
            {/* 하단 라인 드래그 영역 - 모바일에서 더 크게 */}
            <div
              style={{
                position: "absolute", 
                left: 0, 
                bottom: -12, 
                width: "100%", 
                height: 24, 
                cursor: "ns-resize", 
                zIndex: 3,
                touchAction: "none",
                background: "rgba(29, 78, 216, 0.1)",
                borderBottom: "2px solid #1d4ed8",
                borderRadius: "0 0 4px 4px"
              }}
              onMouseDown={e => handleHandleMouseDown('s')(e)}
              onTouchStart={e => handleHandleTouchStart('s')(e)}
            />
            {/* 좌측 라인 드래그 영역 - 모바일에서 더 크게 */}
            <div
              style={{
                position: "absolute", 
                left: -12, 
                top: 0, 
                width: 24, 
                height: "100%", 
                cursor: "ew-resize", 
                zIndex: 3,
                touchAction: "none",
                background: "rgba(29, 78, 216, 0.1)",
                borderLeft: "2px solid #1d4ed8",
                borderRadius: "4px 0 0 4px"
              }}
              onMouseDown={e => handleHandleMouseDown('w')(e)}
              onTouchStart={e => handleHandleTouchStart('w')(e)}
            />
            {/* 우측 라인 드래그 영역 - 모바일에서 더 크게 */}
            <div
              style={{
                position: "absolute", 
                right: -12, 
                top: 0, 
                width: 24, 
                height: "100%", 
                cursor: "ew-resize", 
                zIndex: 3,
                touchAction: "none",
                background: "rgba(29, 78, 216, 0.1)",
                borderRight: "2px solid #1d4ed8",
                borderRadius: "0 4px 4px 0"
              }}
              onMouseDown={e => handleHandleMouseDown('e')(e)}
              onTouchStart={e => handleHandleTouchStart('e')(e)}
            />
            {/* 대각선(모서리) 드래그 영역 - 모바일에서 더 크게 */}
            {/* 좌상단 */}
            <div
              style={{
                position: "absolute", 
                left: -16, 
                top: -16, 
                width: 32, 
                height: 32, 
                cursor: "nwse-resize", 
                zIndex: 4,
                touchAction: "none",
                background: "rgba(29, 78, 216, 0.15)",
                border: "2px solid #1d4ed8",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseDown={e => handleHandleMouseDown('nw')(e)}
              onTouchStart={e => handleHandleTouchStart('nw')(e)}
            >
              <div style={{ width: "8px", height: "8px", background: "#1d4ed8", borderRadius: "50%" }} />
            </div>
            {/* 우상단 */}
            <div
              style={{
                position: "absolute", 
                right: -16, 
                top: -16, 
                width: 32, 
                height: 32, 
                cursor: "nesw-resize", 
                zIndex: 4,
                touchAction: "none",
                background: "rgba(29, 78, 216, 0.15)",
                border: "2px solid #1d4ed8",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseDown={e => handleHandleMouseDown('ne')(e)}
              onTouchStart={e => handleHandleTouchStart('ne')(e)}
            >
              <div style={{ width: "8px", height: "8px", background: "#1d4ed8", borderRadius: "50%" }} />
            </div>
            {/* 좌하단 */}
            <div
              style={{
                position: "absolute", 
                left: -16, 
                bottom: -16, 
                width: 32, 
                height: 32, 
                cursor: "nesw-resize", 
                zIndex: 4,
                touchAction: "none",
                background: "rgba(29, 78, 216, 0.15)",
                border: "2px solid #1d4ed8",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseDown={e => handleHandleMouseDown('sw')(e)}
              onTouchStart={e => handleHandleTouchStart('sw')(e)}
            >
              <div style={{ width: "8px", height: "8px", background: "#1d4ed8", borderRadius: "50%" }} />
            </div>
            {/* 우하단 */}
            <div
              style={{
                position: "absolute", 
                right: -16, 
                bottom: -16, 
                width: 32, 
                height: 32, 
                cursor: "nwse-resize", 
                zIndex: 4,
                touchAction: "none",
                background: "rgba(29, 78, 216, 0.15)",
                border: "2px solid #1d4ed8",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseDown={e => handleHandleMouseDown('se')(e)}
              onTouchStart={e => handleHandleTouchStart('se')(e)}
            >
              <div style={{ width: "8px", height: "8px", background: "#1d4ed8", borderRadius: "50%" }} />
            </div>
          </div>
        )}
        
        {isDragging && dragStart && !resizeDir && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              pointerEvents: "none",
              zIndex: 0
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WindowSelector; 