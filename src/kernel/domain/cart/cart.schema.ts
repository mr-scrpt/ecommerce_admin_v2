import { z } from "zod";

// NOTE: Base
export const cartBaseSchema = z.object({
  userId: z.string(),
});

// NOTE: Projetions
export const cartSchema = z.object({
  id: z.string(),
  ...cartBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
