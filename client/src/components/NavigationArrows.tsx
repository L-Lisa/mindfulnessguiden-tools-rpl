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
            left: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 60
          }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200 hover-elevate active-elevate-2 cursor-pointer"
          aria-label="Föregående kort"
          data-testid="button-previous"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Right Arrow - only show if we can go next */}
      {canGoNext && (
        <button
          onClick={onNext}
          style={{
            position: 'fixed',
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 60
          }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200 hover-elevate active-elevate-2 cursor-pointer"
          aria-label="Nästa kort"
          data-testid="button-next"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}
    </>
  );
}
