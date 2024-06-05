import { z } from "zod";

export const categorySelectorSchema = z.object({
  id: z.string(),
});

export const categoryUpdateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
});

export const categoryPropertySchema = z.object({
  propertyId: z.string(),
});
