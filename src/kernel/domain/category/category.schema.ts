import { z } from "zod";

// NOTE: Base
export const categoryBaseSchema = z.object({
  name: z.string().min(3).max(255),
  // name: z.number().min(1).max(255),
  slug: z.string().min(3).max(255),
  board: z.array(z.string()),
});

// NOTE: Projections
export const categorySchema = z.object({
  id: z.string(),
  ...categoryBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
