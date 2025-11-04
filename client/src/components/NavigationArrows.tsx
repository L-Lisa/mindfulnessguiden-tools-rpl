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
      {/* Left Arrow - only show if we can go previous */}
      {canGoPrevious && (
        <button
          onClick={onPrevious}
          style={{
            position: 'fixed',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 60
          }}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-foreground/10 backdrop-blur-sm transition-all duration-150 hover-elevate active-elevate-2 cursor-pointer"
          aria-label="Föregående kort"
          data-testid="button-previous"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
      )}

      {/* Right Arrow - only show if we can go next */}
      {canGoNext && (
        <button
          onClick={onNext}
          style={{
            position: 'fixed',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 60
          }}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-foreground/10 backdrop-blur-sm transition-all duration-150 hover-elevate active-elevate-2 cursor-pointer"
          aria-label="Nästa kort"
          data-testid="button-next"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      )}
    </>
  );
}
