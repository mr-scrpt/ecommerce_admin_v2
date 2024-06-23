import { z } from "zod";

// NOTE: Base
export const propertyItemBaseSchema = z.object({
  name: z.string(),
  value: z.string(),
});

// NOTE: Projections
export const propertyItemSchema = z.object({
  id: z.string(),
  ...propertyItemBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
