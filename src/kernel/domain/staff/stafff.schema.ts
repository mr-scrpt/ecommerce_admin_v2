import { z } from "zod";

// NOTE: Base
export const staffBaseSchema = z.object({
  email: z.string(),
  phone: z.string(),
  name: z.string(),
  image: z.string().nullable().optional(),
});

// NOTE: Projections
export const staffSchema = z.object({
  id: z.string(),
  ...staffBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
