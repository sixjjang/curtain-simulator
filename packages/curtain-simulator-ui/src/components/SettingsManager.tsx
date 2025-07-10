import React, { useState, useEffect } from 'react';
import { 
  CurtainSettings, 
  saveSettings, 
  loadAllSettings, 
  loadSettings, 
  deleteSettings, 
  updateSettingsName 
} from '../utils/settingsManager';

interface SettingsManagerProps {
  currentSettings: {
    indoorLight: number;
    sunLight: number;
    curtainOpen: number;
    curtainWidth: number;
    waveDepth: number;
    visiblePleats: number;
    curtainOpacity: number;
    perspectiveAngle: number;
    depthIntensity: number;
    selectedColor: any;
    colorLightness: number;
    colorSaturation: number;
    colorHue: number;
    pleatContrast: number;
    materialType: string;
    patternScale: number;
    patternOpacity: number;
    patternAngle: number;
    patternOffset: number;
    selectedProducts: any[];
  };
  onLoadSettings: (settings: any) => void;
}

const SettingsManager: React.FC<SettingsManagerProps> = ({ currentSettings, onLoadSettings }) => {
  const [savedSettings, setSavedSettings] = useState<CurtainSettings[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [settingName, setSettingName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    refreshSettings();
  }, []);

  const refreshSettings = () => {
    const settings = loadAllSettings();
    setSavedSettings(settings);
  };

  const handleSave = () => {
    if (!settingName.trim()) {
      alert('설정 이름을 입력해주세요.');
      return;
    }

    saveSettings(settingName, { settings: currentSettings });
    setSettingName('');
    setShowSaveDialog(false);
    refreshSettings();
  };

  const handleLoad = (id: string) => {
    const settings = loadSettings(id);
    if (settings) {
      onLoadSettings(settings.settings);
      setShowLoadDialog(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('정말로 이 설정을 삭제하시겠습니까?')) {
      deleteSettings(id);
      refreshSettings();
    }
  };

  const handleEditName = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleSaveName = () => {
    if (editingId && editingName.trim()) {
      updateSettingsName(editingId, editingName);
      setEditingId(null);
      setEditingName('');
      refreshSettings();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* 저장/불러오기 버튼 */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => setShowSaveDialog(true)}
          style={{
            padding: "0.5rem 1rem",
            background: "var(--color-primary)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.9rem"
          }}
        >
          💾 설정 저장
        </button>
        <button
          onClick={() => setShowLoadDialog(true)}
          style={{
            padding: "0.5rem 1rem",
            background: "var(--color-accent)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.9rem"
          }}
        >
          📂 설정 불러오기
        </button>
      </div>

      {/* 저장된 설정 개수 표시 */}
      {savedSettings.length > 0 && (
        <div style={{ 
          fontSize: "0.9rem", 
          color: "var(--color-muted)",
          textAlign: "center" 
        }}>
          저장된 설정: {savedSettings.length}개
        </div>
      )}

      {/* 저장 다이얼로그 */}
      {showSaveDialog && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            padding: "2rem",
            borderRadius: "12px",
            minWidth: "300px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{ margin: "0 0 1rem 0" }}>설정 저장</h3>
            <input
              type="text"
              placeholder="설정 이름을 입력하세요"
              value={settingName}
              onChange={(e) => setSettingName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                marginBottom: "1rem"
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            />
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowSaveDialog(false)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "var(--color-muted)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                취소
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: "0.5rem 1rem",
                  background: "var(--color-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 불러오기 다이얼로그 */}
      {showLoadDialog && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            padding: "2rem",
            borderRadius: "12px",
            minWidth: "400px",
            maxWidth: "600px",
            maxHeight: "80vh",
            overflow: "auto",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{ margin: "0 0 1rem 0" }}>설정 불러오기</h3>
            {savedSettings.length === 0 ? (
              <p style={{ color: "var(--color-muted)", textAlign: "center" }}>
                저장된 설정이 없습니다.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {savedSettings.map((setting) => (
                  <div
                    key={setting.id}
                    style={{
                      padding: "1rem",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      {editingId === setting.id ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          style={{
                            padding: "0.3rem",
                            border: "1px solid var(--color-primary)",
                            borderRadius: "4px",
                            marginRight: "0.5rem"
                          }}
                          onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
                        />
                      ) : (
                        <div style={{ fontWeight: "500" }}>{setting.name}</div>
                      )}
                      <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
                        {formatDate(setting.createdAt)}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      {editingId === setting.id ? (
                        <>
                          <button
                            onClick={handleSaveName}
                            style={{
                              padding: "0.3rem 0.6rem",
                              background: "var(--color-primary)",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.8rem"
                            }}
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            style={{
                              padding: "0.3rem 0.6rem",
                              background: "var(--color-muted)",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.8rem"
                            }}
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleLoad(setting.id)}
                            style={{
                              padding: "0.3rem 0.6rem",
                              background: "var(--color-accent)",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.8rem"
                            }}
                          >
                            불러오기
                          </button>
                          <button
                            onClick={() => handleEditName(setting.id, setting.name)}
                            style={{
                              padding: "0.3rem 0.6rem",
                              background: "var(--color-primary)",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.8rem"
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(setting.id)}
                            style={{
                              padding: "0.3rem 0.6rem",
                              background: "#e74c3c",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.8rem"
                            }}
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
              <button
                onClick={() => setShowLoadDialog(false)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "var(--color-muted)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsManager; 