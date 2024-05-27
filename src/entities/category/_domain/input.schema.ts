import { z } from "zod";
import { categorySchema } from "./category.schema";

export const getListInputSchema = z.array(categorySchema);

export const getByInputSchema = z
  .object({
    categoryId: z.string().optional(),
    categorySlug: z.string().optional(),
  })
  .refine((data) => data.categoryId || data.categorySlug, {
    message: "Either 'id' or 'slug' is required",
  });
