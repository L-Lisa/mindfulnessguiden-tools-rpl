import { z } from "zod";

// Exercise schema for mindfulness exercises
export const exerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  duration: z.string(),
  instructions: z.string(),
  category: z.enum(["Andning", "Rörelse", "Meditation"]).optional(),
});

export type Exercise = z.infer<typeof exerciseSchema>;
export type ExerciseCategory = "Andning" | "Rörelse" | "Meditation";
