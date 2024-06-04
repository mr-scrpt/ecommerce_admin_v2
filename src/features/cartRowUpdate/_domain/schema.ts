import { z } from "zod";

export const cartRowUpdateSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});
