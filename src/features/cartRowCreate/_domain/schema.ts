import { z } from "zod";

export const categoryCreateSchema = z.object({
  // cartId: z.string(),
  productId: z.string(),
});
