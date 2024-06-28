import { z } from "zod";

export const storeSelectorSchema = z.object({
  id: z.string(),
});
