import { categoryBaseSchema } from "@/kernel/domain/category/category.schema";
import { z } from "zod";

export const categorySelectorSchema = z.object({
  id: z.string(),
});

export const categoryUpdateSchema = categoryBaseSchema.pick({
  name: true,
  board: true,
});

export const categoryPropertyBindSchema = z.object({
  propertyId: z.string(),
});
