import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function NavigationArrows({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: NavigationArrowsProps) {
  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-foreground/10 backdrop-blur-sm transition-all duration-150 ${
          canGoPrevious
            ? 'hover-elevate active-elevate-2 cursor-pointer'
            : 'opacity-30 cursor-not-allowed'
        }`}
        aria-label="Föregående kort"
        data-testid="button-previous"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`fixed right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-foreground/10 backdrop-blur-sm transition-all duration-150 ${
          canGoNext
            ? 'hover-elevate active-elevate-2 cursor-pointer'
            : 'opacity-30 cursor-not-allowed'
        }`}
        aria-label="Nästa kort"
        data-testid="button-next"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>
    </>
  );
}
