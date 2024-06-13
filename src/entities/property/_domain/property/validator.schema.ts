import { z } from "zod";
import { propertySchema } from "./property.schema";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByCategoryListInputSchema = z.object({
  categoryIdList: z.array(z.object({ categoryId: z.string() })),
});

export const getListOutputSchema = z.array(propertySchema);
