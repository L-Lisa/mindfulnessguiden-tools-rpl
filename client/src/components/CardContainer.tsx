import { useState, useRef, useEffect } from "react";
import type { Exercise } from "@shared/schema";
import { CoverCard } from "./CoverCard";
import { ExerciseCard } from "./ExerciseCard";
import { NavigationArrows } from "./NavigationArrows";
import { ProgressIndicator } from "./ProgressIndicator";

interface CardContainerProps {
  exercises: Exercise[];
  onFavoriteToggle: () => void;
  showFavoritesOnly: boolean;
  onFilterToggle: () => void;
  favoritesCount: number;
}

export function CardContainer({ exercises, onFavoriteToggle, showFavoritesOnly, onFilterToggle, favoritesCount }: CardContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCards = exercises.length + 1; // +1 for cover card
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < totalCards - 1;

  // Clamp currentIndex when exercises array changes (e.g., filtering favorites)
  useEffect(() => {
    if (currentIndex >= totalCards) {
      setCurrentIndex(Math.max(0, totalCards - 1));
    }
  }, [totalCards, currentIndex]);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handlePrevious = () => {
    if (canGoPrevious && !isTransitioning) {
      setIsTransitioning(true);
      setTransitionDirection('right');
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsTransitioning(false);
        setTransitionDirection(null);
      }, 300);
    }
  };

  const handleNext = () => {
    if (canGoNext && !isTransitioning) {
      setIsTransitioning(true);
      setTransitionDirection('left');
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsTransitioning(false);
        setTransitionDirection(null);
      }, 300);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && canGoNext) {
      handleNext();
    } else if (isRightSwipe && canGoPrevious) {
      handlePrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Render current card
  const renderCard = () => {
    if (currentIndex === 0) {
      return (
        <CoverCard 
          showFavoritesOnly={showFavoritesOnly}
          onFilterToggle={onFilterToggle}
          favoritesCount={favoritesCount}
        />
      );
    } else {
      const exercise = exercises[currentIndex - 1];
      // Guard against undefined exercise (can happen during filter transitions)
      if (!exercise) {
        return (
          <CoverCard 
            showFavoritesOnly={showFavoritesOnly}
            onFilterToggle={onFilterToggle}
            favoritesCount={favoritesCount}
          />
        );
      }
      return <ExerciseCard exercise={exercise} onFavoriteToggle={onFavoriteToggle} />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`w-full h-full transition-all duration-300 ease-out ${
          transitionDirection === 'left' ? '-translate-x-full opacity-0' :
          transitionDirection === 'right' ? 'translate-x-full opacity-0' :
          'translate-x-0 opacity-100'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)', paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="max-w-2xl mx-auto h-full flex items-center justify-center px-4">
          <div className="w-full bg-card rounded-2xl shadow-lg overflow-visible" style={{ boxShadow: '0 4px 12px rgba(41, 53, 86, 0.08)' }}>
            {renderCard()}
          </div>
        </div>
      </div>

      <NavigationArrows
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />

      <ProgressIndicator current={currentIndex + 1} total={totalCards} />
    </div>
  );
}
