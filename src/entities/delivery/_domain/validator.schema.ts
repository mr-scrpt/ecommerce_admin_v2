import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";
import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByOrderInputSchema = z.object({
  orderId: z.string(),
});

export const getListOutputSchema = z.array(deliverySchema);
