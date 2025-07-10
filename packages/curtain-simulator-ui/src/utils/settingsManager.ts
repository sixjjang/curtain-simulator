export interface CurtainSettings {
  id: string;
  name: string;
  createdAt: string;
  settings: {
    // 기본 설정
    indoorLight: number;
    sunLight: number;
    
    // 커튼 설정
    curtainOpen: number;
    curtainWidth: number;
    waveDepth: number;
    visiblePleats: number;
    curtainOpacity: number;
    perspectiveAngle: number;
    depthIntensity: number;
    
    // 색상 설정
    selectedColor: any;
    colorLightness: number;
    colorSaturation: number;
    colorHue: number;
    pleatContrast: number;
    
    // 재질 설정
    materialType: string;
    patternScale: number;
    patternOpacity: number;
    patternAngle: number;
    patternOffset: number;
    
    // 제품 설정
    selectedProducts: any[];
  };
}

const STORAGE_KEY = 'curtain-simulator-settings';

export const saveSettings = (name: string, settings: Omit<CurtainSettings, 'id' | 'name' | 'createdAt'>): void => {
  try {
    const existingSettings = loadAllSettings();
    const newSetting: CurtainSettings = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
      settings: settings.settings
    };
    
    existingSettings.push(newSetting);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingSettings));
  } catch (error) {
    console.error('설정 저장 중 오류:', error);
  }
};

export const loadAllSettings = (): CurtainSettings[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('설정 불러오기 중 오류:', error);
    return [];
  }
};

export const loadSettings = (id: string): CurtainSettings | null => {
  try {
    const allSettings = loadAllSettings();
    return allSettings.find(setting => setting.id === id) || null;
  } catch (error) {
    console.error('설정 불러오기 중 오류:', error);
    return null;
  }
};

export const deleteSettings = (id: string): void => {
  try {
    const allSettings = loadAllSettings();
    const filteredSettings = allSettings.filter(setting => setting.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSettings));
  } catch (error) {
    console.error('설정 삭제 중 오류:', error);
  }
};

export const updateSettingsName = (id: string, newName: string): void => {
  try {
    const allSettings = loadAllSettings();
    const updatedSettings = allSettings.map(setting => 
      setting.id === id ? { ...setting, name: newName } : setting
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
  } catch (error) {
    console.error('설정 이름 변경 중 오류:', error);
  }
}; 