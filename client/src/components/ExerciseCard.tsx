import { useState, useEffect } from "react";
import type { Exercise } from "@shared/schema";
import { Heart, CheckCircle2, Circle } from "lucide-react";
import { toggleFavorite, isFavorite, toggleCompleted, isCompleted } from "@/lib/localStorage";
import logoUrl from "@assets/logo_transparent_1762257242802.webp";

interface ExerciseCardProps {
  exercise: Exercise;
  onFavoriteToggle: () => void;
  onCompletionToggle: () => void;
}

export function ExerciseCard({ exercise, onFavoriteToggle, onCompletionToggle }: ExerciseCardProps) {
  const [favorited, setFavorited] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (exercise?.id) {
      setFavorited(isFavorite(exercise.id));
      setCompleted(isCompleted(exercise.id));
    }
  }, [exercise?.id]);

  const handleFavoriteClick = () => {
    if (exercise?.id) {
      const newState = toggleFavorite(exercise.id);
      setFavorited(newState);
      onFavoriteToggle();
    }
  };

  const handleCompletionClick = () => {
    if (exercise?.id) {
      const newState = toggleCompleted(exercise.id);
      setCompleted(newState);
      onCompletionToggle();
    }
  };

  // Guard against undefined exercise
  if (!exercise) {
    return null;
  }

  return (
    <div className="flex flex-col h-full min-h-[70vh] p-6 relative">
      {/* Completion Badge */}
      {completed && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-full shadow-md" data-testid={`badge-completed-${exercise.id}`}>
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-medium">Slutförd</span>
        </div>
      )}

      {/* Watermark */}
      {!completed && (
        <div className="absolute top-4 right-4 text-xs text-muted-foreground" data-testid="text-watermark">
          mindfulnessguiden.se
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-4 left-4 flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-sm transition-all hover-elevate active-elevate-2 ${
          favorited ? 'bg-red-500/20' : 'bg-foreground/10'
        }`}
        aria-label={favorited ? "Ta bort från favoriter" : "Lägg till i favoriter"}
        data-testid={`button-favorite-${exercise.id}`}
      >
        <Heart 
          className={`w-6 h-6 transition-all ${
            favorited ? 'fill-red-500 text-red-500' : 'text-foreground'
          }`}
        />
      </button>

      {/* Completion Button */}
      <button
        onClick={handleCompletionClick}
        className={`absolute top-16 left-4 flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-sm transition-all hover-elevate active-elevate-2 ${
          completed ? 'bg-green-500/20' : 'bg-foreground/10'
        }`}
        aria-label={completed ? "Markera som ej slutförd" : "Markera som slutförd"}
        data-testid={`button-complete-${exercise.id}`}
      >
        {completed ? (
          <CheckCircle2 className="w-6 h-6 text-green-600 fill-green-600" />
        ) : (
          <Circle className="w-6 h-6 text-foreground" />
        )}
      </button>

      {/* Content Container - Scrollable */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8 space-y-6 overflow-y-auto">
        {/* Exercise Name */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground leading-tight" data-testid={`text-exercise-name-${exercise.id}`}>
          {exercise.name}
        </h2>

        {/* Duration */}
        <p className="text-xl font-medium text-muted-foreground" data-testid={`text-duration-${exercise.id}`}>
          Tid: {exercise.duration}
        </p>

        {/* Instructions */}
        <div className="w-full max-w-2xl">
          <p className="text-base md:text-lg text-foreground leading-relaxed whitespace-pre-line" data-testid={`text-instructions-${exercise.id}`}>
            {exercise.instructions}
          </p>
        </div>
      </div>

      {/* Logo at Bottom */}
      <div className="flex justify-center items-end pt-6 pb-2" data-testid="img-logo-bottom">
        <img
          src={logoUrl}
          alt="Mindfulnessguiden"
          className="w-20 h-20 object-contain opacity-80"
        />
      </div>
    </div>
  );
}
