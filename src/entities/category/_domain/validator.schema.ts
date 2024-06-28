import { categorySchema } from "@/kernel/domain/category/category.schema";
import { z } from "zod";

export const getInputSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().optional(),
  })
  .refine((data) => data.id || data.slug, {
    message: "Either 'id' or 'slug' is required",
  });

export const getListOutputSchema = z.array(categorySchema);
