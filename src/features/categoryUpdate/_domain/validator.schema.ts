import { z } from "zod";
import {
  categoryPropertyBindSchema,
  categorySelectorSchema,
  categoryUpdateSchema,
  categoryUpdateSchemaTestError,
} from "./schema";

export const updateInputSchema = z.object({
  selector: categorySelectorSchema,
  categoryData: categoryUpdateSchema,
  // categoryData: categoryUpdateSchema.partial(),
  propertyData: z.array(categoryPropertyBindSchema),
});

export const updateInputSchemaTestError = z.object({
  selector: categorySelectorSchema,
  categoryData: categoryUpdateSchemaTestError,
  // categoryData: categoryUpdateSchema.partial(),
  propertyData: z.array(categoryPropertyBindSchema),
});
