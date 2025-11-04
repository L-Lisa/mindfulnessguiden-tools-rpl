import { Accordion } from "./Accordion";
import { InstallInstructions } from "./InstallInstructions";
import { Filter, FilterX } from "lucide-react";
import logoUrl from "@assets/logo_transparent_1762257242802.webp";

interface CoverCardProps {
  showFavoritesOnly: boolean;
  onFilterToggle: () => void;
  favoritesCount: number;
}

export function CoverCard({ showFavoritesOnly, onFilterToggle, favoritesCount }: CoverCardProps) {
  return (
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

      {/* Installation Instructions Accordion */}
      <div className="w-full max-w-lg">
        <Accordion trigger="Safari browser: Såhär laddar du ned verktygslådan som app i telefonen >">
          <InstallInstructions />
        </Accordion>
      </div>
    </div>
  );
}
