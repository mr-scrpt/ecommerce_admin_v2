import { productBaseSchema } from "@/kernel/domain/product/product.schema";
import { z } from "zod";

export const productSelectorSchema = z.object({
  id: z.string(),
});

export const productUpdateSchema = productBaseSchema.omit({
  slug: true,
  createdAt: true,
});

export const productPropertyItemSchema = z.object({
  propertyItemId: z.string(),
});

export const productCategorySchema = z.object({
  categoryId: z.string(),
});
