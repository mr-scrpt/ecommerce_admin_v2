import { z } from "zod";

export const categoryCreateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
});

export const categoryPropertySchema = z.object({
  propertyId: z.string(),
});
