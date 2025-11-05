import { useState } from "react";
import { Accordion } from "./Accordion";
import { InstallInstructions } from "./InstallInstructions";
import { SettingsPanel } from "./SettingsPanel";
import { Button } from "@/components/ui/button";
import { Filter, FilterX, CheckCircle2, Settings } from "lucide-react";
import logoUrl from "@assets/logo_transparent_1762257242802.webp";
import { getCompletionPercentage } from "@/lib/localStorage";
import type { ExerciseCategory } from "@shared/schema";

interface CoverCardProps {
  showFavoritesOnly: boolean;
  onFilterToggle: () => void;
  favoritesCount: number;
  completedCount: number;
  totalExercises: number;
  selectedCategory: ExerciseCategory | null;
  onCategorySelect: (category: ExerciseCategory | null) => void;
  categoryCounts: Record<ExerciseCategory, number>;
}

export function CoverCard({ showFavoritesOnly, onFilterToggle, favoritesCount, completedCount, totalExercises, selectedCategory, onCategorySelect, categoryCounts }: CoverCardProps) {
  const completionPercentage = getCompletionPercentage(totalExercises);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const categories: ExerciseCategory[] = ["Andning", "Rörelse", "Meditation"];
  
  return (
    <>
      {/* Diagonal Watermark - BETA VERSION */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <div 
          className="text-red-600 font-black opacity-[0.08] select-none whitespace-nowrap"
          style={{ 
            fontSize: '6rem', 
            transform: 'rotate(-45deg)',
            letterSpacing: '0.2em'
          }}
        >
          BETA VERSION
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 space-y-8 relative z-10">
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

      {/* Welcome Text - Hierarchical */}
      <div className="text-center max-w-md space-y-3">
        <h1 className="text-4xl font-bold text-foreground leading-tight">
          Välkommen till Verktygslådan
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          för dig som vill ha mer mindfulness i vardagen
        </p>
      </div>

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

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <Button
          onClick={() => onCategorySelect(null)}
          variant={selectedCategory === null ? "default" : "secondary"}
          size="sm"
          className="rounded-full"
          data-testid="button-category-all"
        >
          Alla ({totalExercises})
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onCategorySelect(category)}
            variant={selectedCategory === category ? "default" : "secondary"}
            size="sm"
            className="rounded-full"
            data-testid={`button-category-${category.toLowerCase()}`}
          >
            {category} ({categoryCounts[category] || 0})
          </Button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {/* Favorites Filter Button */}
        {favoritesCount > 0 && (
          <Button
            onClick={onFilterToggle}
            variant="default"
            className="rounded-full"
            data-testid="button-filter-favorites"
          >
            {showFavoritesOnly ? (
              <>
                <FilterX className="w-5 h-5" />
                <span>Visa alla övningar</span>
              </>
            ) : (
              <>
                <Filter className="w-5 h-5" />
                <span>Visa favoriter ({favoritesCount})</span>
              </>
            )}
          </Button>
        )}

        {/* Settings Button */}
        <Button
          onClick={() => setIsSettingsOpen(true)}
          variant="secondary"
          className="rounded-full"
          aria-label="Inställningar"
          data-testid="button-open-settings"
        >
          <Settings className="w-5 h-5" />
          <span>Inställningar</span>
        </Button>
      </div>

      {/* Installation Instructions Accordion */}
      <div className="w-full max-w-lg">
        <Accordion trigger="Safari browser: Såhär laddar du ned verktygslådan som app i telefonen >">
          <InstallInstructions />
        </Accordion>
      </div>

      {/* Beta Alert Box */}
      <a
        href="https://mindfulnessguiden.se"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-lg px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg text-center hover-elevate active-elevate-2 transition-all group"
        data-testid="link-beta-alert"
      >
        <div className="flex items-center justify-center gap-2 text-amber-800">
          <span className="text-lg">⚠️</span>
          <p className="text-sm font-medium">
            Detta är en testversion som kommer att uppdateras
          </p>
        </div>
        <p className="text-xs text-amber-700 mt-1 group-hover:underline">
          Läs mer på mindfulnessguiden.se
        </p>
      </a>
    </div>

    {/* Settings Panel */}
    <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
