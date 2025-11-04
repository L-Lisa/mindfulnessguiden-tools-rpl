import { z } from "zod";

// Exercise schema for mindfulness exercises
export const exerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  duration: z.string(),
  instructions: z.string(),
});

export type Exercise = z.infer<typeof exerciseSchema>;
