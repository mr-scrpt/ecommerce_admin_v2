import { z } from "zod";

// NOTE: Base
export const cartRowBaseSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  createdAt: z.date(),
});

export const cartRowSchema = z.object({
  id: z.string(),
  ...cartRowBaseSchema.shape,
});
