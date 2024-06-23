import { z } from "zod";

// NOTE: Base
export const consumerBaseSchema = z.object({
  email: z.string(),
  phone: z.string(),
  name: z.string(),
  image: z.string().nullable().optional(),
});
// NOTE: Projections
export const consumerSchema = z.object({
  id: z.string(),
  ...consumerBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
