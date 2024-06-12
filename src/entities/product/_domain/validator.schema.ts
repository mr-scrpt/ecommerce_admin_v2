import { z } from "zod";
import { productSchema } from "./product.schema";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByOwnerInputSchema = z.object({
  ownerId: z.string(),
});

export const getListOutputSchema = z.array(productSchema);
