import { z } from "zod";
import { cartRowSchema } from "./cartRow.schema";

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

// NOTE: Composite
export const cartCompositeSchema = z.object({
  ...cartSchema.shape,
  cartRowList: z.array(cartRowSchema),
});
