import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const searchInputSchema = z.object({
  q: z.string(),
});
