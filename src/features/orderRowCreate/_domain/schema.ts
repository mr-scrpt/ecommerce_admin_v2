import { cartRowBaseSchema } from "@/kernel/domain/cart/cartRow.schema";
import { z } from "zod";

export const orderRowSelectorSchema = z.object({
  orderId: z.string(),
});

export const orderRowCreateSchema = cartRowBaseSchema.pick({
  productId: true,
  quantity: true,
});
