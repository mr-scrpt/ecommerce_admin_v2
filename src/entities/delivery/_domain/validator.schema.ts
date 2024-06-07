import { z } from "zod";
import { deliverySchema } from "./delivery.schema";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByOrderInputSchema = z.object({
  orderId: z.string(),
});

export const getListOutputSchema = z.array(deliverySchema);
