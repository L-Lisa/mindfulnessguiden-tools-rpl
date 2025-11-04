import { useState, useEffect } from "react";
import { X, Type, Palette, Check } from "lucide-react";
import { getSettings, saveSettings, applySettings, type Settings, type FontSize, type Theme } from "@/lib/settings";
import { useToast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [settings, setSettings] = useState<Settings>(getSettings());
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSettings(getSettings());
    }
  }, [isOpen]);

  const handleFontSizeChange = (size: FontSize) => {
    const newSettings = { ...settings, fontSize: size };
    setSettings(newSettings);
    saveSettings(newSettings);
    applySettings(newSettings);
    
    toast({
      title: "Textstorlek uppdaterad",
      description: `Textstorlek ändrad till ${size === 'small' ? 'liten' : size === 'large' ? 'stor' : 'medium'}`,
    });
  };

  const handleThemeChange = (theme: Theme) => {
    const newSettings = { ...settings, theme: theme };
    setSettings(newSettings);
    saveSettings(newSettings);
    applySettings(newSettings);
    
    toast({
      title: "Tema uppdaterat",
      description: `Tema ändrat till ${theme === 'high-contrast' ? 'hög kontrast' : 'standard'}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" data-testid="settings-panel-overlay">
      <div className="relative w-full max-w-md mx-4 bg-card border rounded-2xl shadow-lg overflow-hidden" data-testid="settings-panel">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-foreground">Inställningar</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground hover-elevate active-elevate-2 transition-all"
            aria-label="Stäng inställningar"
            data-testid="button-close-settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Font Size */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Type className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Textstorlek</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {(['small', 'medium', 'large'] as FontSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => handleFontSizeChange(size)}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover-elevate active-elevate-2 ${
                    settings.fontSize === size
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-background'
                  }`}
                  aria-label={`Textstorlek: ${size === 'small' ? 'liten' : size === 'large' ? 'stor' : 'medium'}`}
                  data-testid={`button-font-size-${size}`}
                >
                  {settings.fontSize === size && (
                    <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />
                  )}
                  <div className={`font-semibold ${
                    size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-base'
                  }`}>
                    Aa
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {size === 'small' ? 'Liten' : size === 'large' ? 'Stor' : 'Medium'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Utseende</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {(['default', 'high-contrast'] as Theme[]).map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover-elevate active-elevate-2 ${
                    settings.theme === theme
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-background'
                  }`}
                  aria-label={`Tema: ${theme === 'high-contrast' ? 'hög kontrast' : 'standard'}`}
                  data-testid={`button-theme-${theme}`}
                >
                  {settings.theme === theme && (
                    <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />
                  )}
                  <div className="text-sm font-medium">
                    {theme === 'high-contrast' ? 'Hög kontrast' : 'Standard'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Note */}
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dessa inställningar hjälper dig att anpassa appen för bättre läsbarhet och tillgänglighet. 
              Inställningarna sparas automatiskt på din enhet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
