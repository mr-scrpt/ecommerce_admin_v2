import { z } from "zod";

export const categorySelectorSchema = z.object({
  id: z.string(),
});
