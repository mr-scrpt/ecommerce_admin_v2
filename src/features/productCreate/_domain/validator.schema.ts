import { z } from "zod";
import {
  productCategorySchema,
  productCreateSchema,
  productPropertyItemSchema,
} from "./schema";

export const createInputSchema = z.object({
  productData: productCreateSchema,
  categoryData: z.array(productCategorySchema),
  propertyItemData: z.array(productPropertyItemSchema),
});
