import { z } from "zod";
import { categorySchema } from "./category.schema";

export const getByInputSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().optional(),
  })
  .refine((data) => data.id || data.slug, {
    message: "Either 'id' or 'slug' is required",
  });

export const getListOutputSchema = z.array(categorySchema);
