import { z } from "zod";

// NOTE: Base
export const cartRowBaseSchema = z.object({
  quantity: z.number(),
});

export const cartRowSchema = z.object({
  id: z.string(),
  ...cartRowBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
