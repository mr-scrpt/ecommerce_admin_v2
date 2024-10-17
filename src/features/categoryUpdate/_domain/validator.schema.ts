import { z } from "zod";
import {
  categoryPropertyBindSchema,
  categorySelectorSchema,
  categoryUpdateSchema,
} from "./schema";

export const updateInputSchema = z.object({
  selector: categorySelectorSchema,
  categoryData: categoryUpdateSchema,
  // categoryData: categoryUpdateSchema.partial(),
  propertyData: z.array(categoryPropertyBindSchema),
});
