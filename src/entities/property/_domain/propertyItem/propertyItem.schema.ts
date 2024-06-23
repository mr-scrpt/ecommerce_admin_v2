import { productSchema } from "@/kernel/domain/product/product.schema";
import { propertySchema } from "@/kernel/domain/property/property.schema";
import { propertyItemSchema } from "@/kernel/domain/property/propertyItem.schema";
import { z } from "zod";

// NOTE: Relations
export const propertyItemRelationSchema = z.object({
  ...propertyItemSchema.shape,
  propertyId: propertySchema.shape.id,
  productList: z.array(productSchema),
});
