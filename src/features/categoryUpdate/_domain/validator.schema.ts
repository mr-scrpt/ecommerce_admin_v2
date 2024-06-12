import { z } from "zod";
import {
  categoryPropertySchema,
  categorySelectorSchema,
  categoryUpdateSchema,
} from "./schema";

export const updateInputSchema = z.object({
  selector: categorySelectorSchema,
  categoryData: categoryUpdateSchema.partial(),
  propertyData: z.array(categoryPropertySchema),
});
