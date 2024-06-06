import { z } from "zod";

export const cartRowSelectorSchema = z.object({
  productId: z.string(),
});

export const cartRowUpdateSchema = z.object({
  quantity: z.number(),
});
