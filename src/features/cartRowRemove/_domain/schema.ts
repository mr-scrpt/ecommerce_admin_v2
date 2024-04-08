import { z } from "zod";

export const cartRowRemoveSchema = z.object({
  productId: z.string(),
});
