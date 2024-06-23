import { categorySchema } from "@/kernel/domain/category/category.schema";
import { productSchema } from "@/kernel/domain/product/product.schema";
import { propertySchema } from "@/kernel/domain/property/property.schema";
import { z } from "zod";

// NOTE: Relations
export const categoryRelationSchema = z.object({
  ...categorySchema.shape,

  productList: z.array(productSchema),
  propertyList: z.array(propertySchema),
});
