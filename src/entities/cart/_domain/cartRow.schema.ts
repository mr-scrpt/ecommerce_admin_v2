import { z } from "zod";

export const cartRowSchema = z.object({
  id: z.string(),
  productId: z.string(),
  quantity: z.number(),
  createdAt: z.date(),
});
