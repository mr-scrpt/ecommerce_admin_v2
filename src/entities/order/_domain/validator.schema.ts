import { z } from "zod";
import { orderSchema } from "..";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByOwnerInputSchema = z.object({
  ownerId: z.string(),
});

export const getListOutputSchema = z.array(orderSchema);
