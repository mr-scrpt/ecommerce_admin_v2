import { z } from "zod";
import { productSchema } from "./product.schema";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getListByIdListInputSchema = z.object({
  idList: z.array(z.object({ id: z.string() })),
});

export const searchInputSchema = z.object({
  q: z.string(),
});

export const getListOutputSchema = z.array(productSchema);
