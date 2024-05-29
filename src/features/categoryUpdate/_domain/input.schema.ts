import { z } from "zod";
import { categoryPropertySchema, categoryUpdateSchema } from "./schema";

export const updateInputSchema = z.object({
  categoryData: categoryUpdateSchema,
  propertyData: z.array(categoryPropertySchema),
});
