import { z } from "zod";
import { deliverySchema } from "./delivery.schema";

export const getByInputSchema = z.object({
  deliveryId: z.string(),
});

export const getListOutputSchema = z.array(deliverySchema);
