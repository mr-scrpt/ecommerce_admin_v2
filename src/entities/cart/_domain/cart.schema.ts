import { z } from "zod";
import { cartRowSchema } from "./cartRow.schema";

export const cartSchema = z.object({
  id: z.string(),
  userId: z.string(),
});

export const cartRelationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),

  cartRowList: z.array(cartRowSchema),
});
