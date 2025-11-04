import { useEffect, useState } from "react";
import type { Exercise } from "@shared/schema";
import { CardContainer } from "@/components/CardContainer";
import { getFavorites, getCompleted } from "@/lib/localStorage";

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const response = await fetch('/exercises.json');
        if (!response.ok) {
          throw new Error('Failed to load exercises');
        }
        const data = await response.json();
        setExercises(data.exercises);
        setFavorites(getFavorites());
        setCompleted(getCompleted());
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load exercises:", error);
        setIsLoading(false);
      }
    };

    loadExercises();
  }, []);

  const handleFavoriteToggle = () => {
    setFavorites(getFavorites());
  };

  const handleCompletionToggle = () => {
    setCompleted(getCompleted());
  };

  const handleFilterToggle = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const filteredExercises = showFavoritesOnly
    ? exercises.filter(ex => favorites.includes(ex.id))
    : exercises;

  // Auto-disable favorites-only mode if no favorites exist
  useEffect(() => {
    if (showFavoritesOnly && favorites.length === 0) {
      setShowFavoritesOnly(false);
    }
  }, [favorites.length, showFavoritesOnly]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-foreground font-medium">Laddar övningar...</p>
        </div>
      </div>
    );
  }

  return (
    <CardContainer 
      exercises={filteredExercises} 
      onFavoriteToggle={handleFavoriteToggle}
      showFavoritesOnly={showFavoritesOnly}
      onFilterToggle={handleFilterToggle}
      favoritesCount={favorites.length}
      onCompletionToggle={handleCompletionToggle}
      completedCount={completed.length}
      totalExercises={exercises.length}
    />
  );
}
