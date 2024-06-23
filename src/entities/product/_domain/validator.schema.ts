import { productSchema } from "@/kernel/domain/product/product.schema";
import { z } from "zod";

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
