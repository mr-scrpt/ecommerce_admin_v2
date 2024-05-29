import { z } from "zod";
import { categoryCreateSchema, categoryPropertySchema } from "./schema";

export const createInputSchema = z.object({
  categoryData: categoryCreateSchema,
  propertyData: z.array(categoryPropertySchema),
});
