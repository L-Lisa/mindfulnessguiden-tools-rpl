import { useEffect, useState } from "react";
import type { Exercise } from "@shared/schema";
import { CardContainer } from "@/components/CardContainer";

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

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

  return <CardContainer exercises={exercises} />;
}
