import { categorySchema } from "@/kernel/domain/category/category.schema";
import { productSchema } from "@/kernel/domain/product/product.schema";
import { propertyItemSchema } from "@/kernel/domain/property/propertyItem.schema";
import { z } from "zod";

// NOTE: Relation
export const productRelationSchema = z.object({
  ...productSchema.shape,

  // categoryList: z.array(
  //   z.object({
  //     id: z.string(),
  //     name: z.string(),
  //   }),
  // ),
  categoryList: z.array(categorySchema),
  // propertyItemListSelected: z.array(
  //   z.object({
  //     id: z.string(),
  //     name: z.string(),
  //     value: z.string(),
  //     propertyId: z.string(),
  //   }),
  // ),
  propertyItemListSelected: z.array(propertyItemSchema),
});
