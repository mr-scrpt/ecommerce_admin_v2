import { z } from "zod";

export const createInputSchema = z.object({
  categoryId: z.string().optional(),
});
