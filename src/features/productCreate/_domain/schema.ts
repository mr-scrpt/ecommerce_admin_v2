import { productBaseSchema } from "@/entities/product/server";
import { z } from "zod";

export const productCreateSchema = productBaseSchema.omit({
  slug: true,
  createdAt: true,
});

export const productPropertyItemSchema = z.object({
  propertyItemId: z.string(),
});

export const productCategorySchema = z.object({
  categoryId: z.string(),
});
