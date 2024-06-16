import { z } from "zod";
import {
  productCategorySchema,
  productUpdateSchema,
  productPropertyItemSchema,
  productSelectorSchema,
} from "./schema";

export const updateInputSchema = z.object({
  selector: productSelectorSchema,
  productData: productUpdateSchema,
  categoryData: z.array(productCategorySchema),
  propertyItemData: z.array(productPropertyItemSchema),
});
