import { useState, useEffect } from "react";
import type { Exercise } from "@shared/schema";
import { Heart, CheckCircle2, Circle, Share2 } from "lucide-react";
import { toggleFavorite, isFavorite, toggleCompleted, isCompleted } from "@/lib/localStorage";
import { shareExercise } from "@/lib/share";
import { useToast } from "@/hooks/use-toast";
import { Timer } from "./Timer";
import logoUrl from "@assets/logo_transparent_1762257242802.webp";

interface ExerciseCardProps {
  exercise: Exercise;
  onFavoriteToggle: () => void;
  onCompletionToggle: () => void;
}

export function ExerciseCard({ exercise, onFavoriteToggle, onCompletionToggle }: ExerciseCardProps) {
  const [favorited, setFavorited] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setFavorited(isFavorite(exercise.id));
    setCompleted(isCompleted(exercise.id));
  }, [exercise.id]);

  const handleFavoriteClick = () => {
    const newState = toggleFavorite(exercise.id);
    setFavorited(newState);
    onFavoriteToggle();
  };

  const handleCompletionClick = () => {
    const newState = toggleCompleted(exercise.id);
    setCompleted(newState);
    onCompletionToggle();
  };

  const handleShare = async () => {
    if (!exercise) return;

    const result = await shareExercise(exercise);
    
    if (result.success) {
      if (result.method === 'clipboard') {
        toast({
          title: "Kopierat!",
          description: "Övningen har kopierats till urklipp",
        });
      } else if (result.method === 'share') {
        toast({
          title: "Delat!",
          description: "Övningen har delats",
        });
      }
    } else if (result.method !== 'cancelled') {
      toast({
        title: "Delning misslyckades",
        description: "Din webbläsare stöder inte delning eller urklipp. Prova en annan webbläsare.",
        variant: "destructive",
      });
    }
  };

  // Guard against undefined exercise
  if (!exercise) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-[70vh] p-6 relative">
      {/* Completion Badge */}
      {completed && (
        <div className="sticky top-0 right-0 flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-full shadow-md ml-auto mb-2 w-fit" data-testid={`badge-completed-${exercise.id}`}>
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-medium">Slutförd</span>
        </div>
      )}

      {/* Watermark */}
      {!completed && (
        <div className="sticky top-0 right-0 text-xs text-muted-foreground ml-auto mb-2 w-fit" data-testid="text-watermark">
          mindfulnessguiden.se
        </div>
      )}

      {/* Action Buttons - Sticky on top, horizontal */}
      <div className="sticky top-0 left-0 flex flex-row gap-2 mb-4">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-sm transition-all hover-elevate active-elevate-2 ${
            favorited ? 'bg-red-500/20' : 'bg-foreground/10'
          }`}
          aria-label={favorited ? "Ta bort från favoriter" : "Lägg till i favoriter"}
          data-testid={`button-favorite-${exercise.id}`}
        >
          <Heart 
            className={`w-5 h-5 transition-all ${
              favorited ? 'fill-red-500 text-red-500' : 'text-foreground'
            }`}
          />
        </button>

        {/* Completion Button */}
        <button
          onClick={handleCompletionClick}
          className={`flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-sm transition-all hover-elevate active-elevate-2 ${
            completed ? 'bg-green-500/20' : 'bg-foreground/10'
          }`}
          aria-label={completed ? "Markera som ej slutförd" : "Markera som slutförd"}
          data-testid={`button-complete-${exercise.id}`}
        >
          {completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 fill-green-600" />
          ) : (
            <Circle className="w-5 h-5 text-foreground" />
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-sm bg-foreground/10 transition-all hover-elevate active-elevate-2"
          aria-label="Dela övning"
          data-testid={`button-share-${exercise.id}`}
        >
          <Share2 className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col items-center justify-start space-y-6">
        {/* Exercise Name */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground leading-tight" data-testid={`text-exercise-name-${exercise.id}`}>
          {exercise.name}
        </h2>

        {/* Timer */}
        {exercise.duration && (
          <Timer durationStr={exercise.duration} exerciseId={exercise.id} />
        )}

        {/* Instructions */}
        <div className="w-full max-w-2xl">
          <p className="text-base md:text-lg text-foreground leading-relaxed whitespace-pre-line" data-testid={`text-instructions-${exercise.id}`}>
            {exercise.instructions}
          </p>
        </div>
      </div>

      {/* Logo at Bottom */}
      <div className="flex justify-center items-center pt-6 pb-2 mt-auto" data-testid="img-logo-bottom">
        <img
          src={logoUrl}
          alt="Mindfulnessguiden"
          className="w-20 h-20 object-contain opacity-80"
        />
      </div>
    </div>
  );
}
