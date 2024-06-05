import { z } from "zod";

export const selectorSchema = z.object({
  productId: z.string(),
});
