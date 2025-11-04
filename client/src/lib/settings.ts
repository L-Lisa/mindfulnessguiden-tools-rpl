// Settings utilities for accessibility and user preferences

export type FontSize = 'small' | 'medium' | 'large';
export type Theme = 'default' | 'high-contrast';

export interface Settings {
  fontSize: FontSize;
  theme: Theme;
}

const DEFAULT_SETTINGS: Settings = {
  fontSize: 'medium',
  theme: 'default',
};

const STORAGE_KEY = 'mindfulness_settings';

export function getSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function getFontSize(): FontSize {
  return getSettings().fontSize;
}

export function setFontSize(size: FontSize): void {
  const settings = getSettings();
  saveSettings({ ...settings, fontSize: size });
}

export function getTheme(): Theme {
  return getSettings().theme;
}

export function setTheme(theme: Theme): void {
  const settings = getSettings();
  saveSettings({ ...settings, theme: theme });
}

export function applySettings(settings: Settings): void {
  const root = document.documentElement;
  
  root.setAttribute('data-font-size', settings.fontSize);
  root.setAttribute('data-theme', settings.theme);
  
  const fontSizeMap: Record<FontSize, string> = {
    small: '14px',
    medium: '16px',
    large: '20px',
  };
  
  root.style.setProperty('--base-font-size', fontSizeMap[settings.fontSize]);
}
