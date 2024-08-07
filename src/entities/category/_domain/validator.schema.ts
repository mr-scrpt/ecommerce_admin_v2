import { categorySchema } from "@/kernel/domain/category/category.schema";
import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getBySlugInputSchema = z.object({
  slug: z.string(),
});
export const getListOutputSchema = z.array(categorySchema);
