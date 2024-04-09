import { z } from "zod";

// NOTE: Main information
export const orderRowAddForm = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export type OrderRowAddValues = z.infer<typeof orderRowAddForm>;
