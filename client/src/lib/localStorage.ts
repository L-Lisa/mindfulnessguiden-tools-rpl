// LocalStorage utilities for PWA data persistence

const STORAGE_KEYS = {
  FAVORITES: 'mindfulness_favorites',
  COMPLETED: 'mindfulness_completed',
} as const;

// Favorites
export function getFavorites(): number[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse favorites from localStorage:', error);
    return [];
  }
}

export function toggleFavorite(exerciseId: number): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(exerciseId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(exerciseId);
  }
  
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  return index === -1; // return true if now favorited
}

export function isFavorite(exerciseId: number): boolean {
  return getFavorites().includes(exerciseId);
}

// Completed exercises
export function getCompleted(): number[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COMPLETED);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse completed from localStorage:', error);
    return [];
  }
}

export function toggleCompleted(exerciseId: number): boolean {
  const completed = getCompleted();
  const index = completed.indexOf(exerciseId);
  
  if (index > -1) {
    completed.splice(index, 1);
  } else {
    completed.push(exerciseId);
  }
  
  localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(completed));
  return index === -1; // return true if now completed
}

export function isCompleted(exerciseId: number): boolean {
  return getCompleted().includes(exerciseId);
}

export function getCompletionPercentage(totalExercises: number): number {
  const completed = getCompleted().length;
  return totalExercises > 0 ? Math.round((completed / totalExercises) * 100) : 0;
}
