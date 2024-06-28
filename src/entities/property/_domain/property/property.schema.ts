import { categorySchema } from "@/kernel/domain/category/category.schema";
import { propertyCompositeSchema } from "@/kernel/domain/property/property.schema";
import { z } from "zod";

export const propertyRelationSchema = z.object({
  ...propertyCompositeSchema.shape,
  categoryList: z.array(categorySchema),
});
