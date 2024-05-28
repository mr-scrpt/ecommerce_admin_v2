import { z } from "zod";

export const removeInputSchema = z.object({
  categoryId: z.string(),
});
