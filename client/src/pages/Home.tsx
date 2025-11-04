import { useEffect, useState } from "react";
import type { Exercise } from "@shared/schema";
import { CardContainer } from "@/components/CardContainer";

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load exercises from JSON file (will be created in integration phase)
    // For now, we'll use placeholder data
    const loadExercises = async () => {
      try {
        // This will be replaced with actual fetch in integration phase
        const mockExercises: Exercise[] = [
          {
            id: 1,
            name: "Bodyscan meditation",
            duration: "8 minuter",
            instructions: "Ligg på rygg med benen utsträckta och armarna längs sidorna, handflatorna vända uppåt. Fokusera din uppmärksamhet långsamt och medvetet på varje del av din kropp, i ordning, från tå till huvud eller huvud till tå. Var medveten om eventuella känslor, känslor eller tankar som är förknippade med varje del av din kropp."
          }
        ];
        setExercises(mockExercises);
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
