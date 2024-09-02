import { orderSchema } from "@/kernel/domain/order/order.schema";
import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByOwnerInputSchema = z.object({
  // ownerId: z.string(),
  consumerId: z.string(),
});

export const getListOutputSchema = z.array(orderSchema);
