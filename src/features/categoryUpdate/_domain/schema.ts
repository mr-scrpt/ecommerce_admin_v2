import { z } from "zod";

export const categoryUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  board: z.array(z.string()),
});

export const categoryPropertySchema = z.object({
  id: z.string(),
});
