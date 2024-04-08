import { z } from "zod";

export const cartRowChangeQuantitySchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});
