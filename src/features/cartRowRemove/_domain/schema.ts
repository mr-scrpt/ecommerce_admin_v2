import { z } from "zod";

export const cartRowSelectorSchema = z.object({
  productId: z.string(),
});
