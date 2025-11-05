import { useEffect, useState, useMemo } from "react";
import type { Exercise, ExerciseCategory } from "@shared/schema";
import { CardContainer } from "@/components/CardContainer";
import { getFavorites, getCompleted } from "@/lib/localStorage";

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  // Load exercises and initial state
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const response = await fetch('/exercises.json');
        if (!response.ok) {
          throw new Error('Failed to load exercises');
        }
        const data = await response.json();
        setExercises(data.exercises);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load exercises:", error);
        setIsLoading(false);
      }
    };

    loadExercises();
    // Load favorites and completed from localStorage once
    setFavorites(getFavorites());
    setCompleted(getCompleted());
  }, []);

  const handleFavoriteToggle = () => {
    setFavorites(getFavorites());
  };

  const handleCompletionToggle = () => {
    setCompleted(getCompleted());
  };

  const handleFilterToggle = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    // Reset to CoverCard when filter changes to avoid blank screens
    window.location.hash = '';
  };

  const handleCategorySelect = (category: ExerciseCategory | null) => {
    setSelectedCategory(category);
    // Reset to CoverCard when filter changes to avoid blank screens
    window.location.hash = '';
  };

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ExerciseCategory, number> = {
      "Andning": 0,
      "Rörelse": 0,
      "Meditation": 0
    };
    
    exercises.forEach(ex => {
      if (ex.category) {
        counts[ex.category] = (counts[ex.category] || 0) + 1;
      }
    });
    
    return counts;
  }, [exercises]);

  // Filter exercises by favorites and category
  const filteredExercises = useMemo(() => {
    let filtered = exercises;
    
    // Filter by category first
    if (selectedCategory) {
      filtered = filtered.filter(ex => ex.category === selectedCategory);
    }
    
    // Then filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter(ex => favorites.includes(ex.id));
    }
    
    return filtered;
  }, [exercises, selectedCategory, showFavoritesOnly, favorites]);

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
      selectedCategory={selectedCategory}
      onCategorySelect={handleCategorySelect}
      categoryCounts={categoryCounts}
    />
  );
}
