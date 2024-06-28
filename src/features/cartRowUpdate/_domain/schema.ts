import { cartRowBaseSchema } from "@/kernel/domain/cart/cartRow.schema";
import { z } from "zod";

export const cartRowSelectorSchema = z.object({
  productId: z.string(),
});

export const cartRowUpdateSchema = cartRowBaseSchema
  .pick({ quantity: true })
  .partial();
