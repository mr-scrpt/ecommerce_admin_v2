import { z } from "zod";

export const cartRowAddSchema = z.object({
  productId: z.string(),
});
