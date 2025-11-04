import { useState } from "react";
import { Accordion } from "./Accordion";
import { InstallInstructions } from "./InstallInstructions";
import { SettingsPanel } from "./SettingsPanel";
import { Filter, FilterX, CheckCircle2, Settings } from "lucide-react";
import logoUrl from "@assets/logo_transparent_1762257242802.webp";
import { getCompletionPercentage } from "@/lib/localStorage";

interface CoverCardProps {
  showFavoritesOnly: boolean;
  onFilterToggle: () => void;
  favoritesCount: number;
  completedCount: number;
  totalExercises: number;
}

export function CoverCard({ showFavoritesOnly, onFilterToggle, favoritesCount, completedCount, totalExercises }: CoverCardProps) {
  const completionPercentage = getCompletionPercentage(totalExercises);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 space-y-8">
      {/* Website Link */}
      <a
        href="https://mindfulnessguiden.se"
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-medium text-primary hover:underline transition-all"
        data-testid="link-website"
      >
        mindfulnessguiden.se
      </a>

      {/* Logo */}
      <div className="w-48 h-48 flex items-center justify-center" data-testid="img-logo-cover">
        <img
          src={logoUrl}
          alt="Mindfulnessguiden logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Welcome Text */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground leading-tight max-w-md">
        Välkommen till Verktygslådan för mindfulnessguider
      </h1>

      {/* Completion Progress */}
      {completedCount > 0 && (
        <div className="flex items-center gap-3 px-5 py-3 bg-green-500/10 rounded-full border border-green-500/20" data-testid="text-completion-progress">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {completedCount} av {totalExercises} övningar slutförda
            </p>
            <p className="text-xs text-muted-foreground">{completionPercentage}% klart</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {/* Favorites Filter Button */}
        {favoritesCount > 0 && (
          <button
            onClick={onFilterToggle}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover-elevate active-elevate-2 transition-all"
            data-testid="button-filter-favorites"
          >
            {showFavoritesOnly ? (
              <>
                <FilterX className="w-5 h-5" />
                <span className="font-medium">Visa alla övningar</span>
              </>
            ) : (
              <>
                <Filter className="w-5 h-5" />
                <span className="font-medium">Visa favoriter ({favoritesCount})</span>
              </>
            )}
          </button>
        )}

        {/* Settings Button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-full hover-elevate active-elevate-2 transition-all"
          aria-label="Inställningar"
          data-testid="button-open-settings"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Inställningar</span>
        </button>
      </div>

      {/* Installation Instructions Accordion */}
      <div className="w-full max-w-lg">
        <Accordion trigger="Safari browser: Såhär laddar du ned verktygslådan som app i telefonen >">
          <InstallInstructions />
        </Accordion>
      </div>
    </div>

    {/* Settings Panel */}
    <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
