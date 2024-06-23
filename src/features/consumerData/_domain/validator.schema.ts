import { z } from "zod";

export const getByOrderInputSchema = z.object({
  orderId: z.string(),
});
