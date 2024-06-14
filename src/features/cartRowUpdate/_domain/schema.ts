import { cartRowBaseSchema } from "@/entities/cart/server";
import { z } from "zod";

export const cartRowSelectorSchema = z.object({
  productId: z.string(),
});

export const cartRowUpdateSchema = cartRowBaseSchema.pick({ quantity: true });
