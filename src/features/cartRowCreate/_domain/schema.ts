import { z } from "zod";

export const cartRowCreateSchema = z.object({
  // cartId: z.string(),
  productId: z.string(),
});
