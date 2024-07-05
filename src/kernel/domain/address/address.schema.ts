import { z } from "zod";

// NOTE: Base
export const addressBaseSchema = z.object({
  userId: z.string(),
  settlementRef: z.string(),
  street: z.string(),
  house: z.string(),
  apartment: z.string().optional(),
});

// NOTE: Projections
export const addressSchema = z.object({
  id: z.string(),
  ...addressBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
