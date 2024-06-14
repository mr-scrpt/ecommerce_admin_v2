import { categoryBaseSchema } from "@/entities/category/server";
import { z } from "zod";

export const categoryCreateSchema = categoryBaseSchema.pick({
  name: true,
  board: true,
});
export const categoryPropertySchema = z.object({
  propertyId: z.string(),
});
