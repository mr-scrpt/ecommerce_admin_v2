import { z } from "zod";

// NOTE: Base
export const categoryBaseSchema = z.object({
  name: z.string(),
  slug: z.string(),
  board: z.array(z.string()),
});

// NOTE: Projections
export const categorySchema = z.object({
  id: z.string(),
  ...categoryBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
