import { z } from "zod";

export const orderRowAddSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});
