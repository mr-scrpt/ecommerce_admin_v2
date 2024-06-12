import { z } from "zod";

export const productSelectorSchema = z.object({
  id: z.string(),
});
