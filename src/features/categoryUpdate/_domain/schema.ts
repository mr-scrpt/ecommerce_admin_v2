import { categoryBaseSchema } from "@/entities/category/server";
import { z } from "zod";

export const categorySelectorSchema = z.object({
  id: z.string(),
});

export const categoryUpdateSchema = categoryBaseSchema.pick({
  name: true,
  board: true,
});

export const categoryPropertySchema = z.object({
  propertyId: z.string(),
});
