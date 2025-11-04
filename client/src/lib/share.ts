// Sharing utilities for mindfulness exercises

import type { Exercise } from "@shared/schema";

export function formatShareText(exercise: Exercise): string {
  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/#exercise-${exercise.id}`;
  
  const instructionsPreview = exercise.instructions.length > 200
    ? `${exercise.instructions.substring(0, 200)}...`
    : exercise.instructions;
  
  return `${exercise.name}\n\n` +
         `Tid: ${exercise.duration}\n\n` +
         `${instructionsPreview}\n\n` +
         `Från Mindfulnessguiden - Verktygslådan för mindfulnessguider\n${shareUrl}`;
}

export function getExerciseUrl(exerciseId: number): string {
  return `${window.location.origin}/#exercise-${exerciseId}`;
}

export async function shareExercise(exercise: Exercise): Promise<{ success: boolean; method: 'share' | 'clipboard' | 'cancelled' | 'none' }> {
  const shareText = formatShareText(exercise);
  const exerciseUrl = getExerciseUrl(exercise.id);
  const shareData = {
    title: `${exercise.name} - Mindfulnessguiden`,
    text: shareText,
    url: exerciseUrl
  };

  if (navigator.share && navigator.canShare?.(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'share' };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return { success: false, method: 'cancelled' };
      }
      console.warn('Share failed, falling back to clipboard:', error);
    }
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(shareText);
      return { success: true, method: 'clipboard' };
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return { success: false, method: 'none' };
    }
  }

  console.error('Neither Web Share API nor Clipboard API available');
  return { success: false, method: 'none' };
}
