import { z } from "zod";
import { cartRowSchema } from "./cartRow.schema";

// NOTE: Base
export const cartBaseSchema = z.object({
  userId: z.string(),
});

// NOTE: Main
export const cartSchema = z.object({
  id: z.string(),
  ...cartBaseSchema.shape,
});

export const cartRelationSchema = z.object({
  id: z.string(),
  ...cartBaseSchema.shape,

  cartRowList: z.array(cartRowSchema),
});
