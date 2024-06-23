import { z } from "zod";

// NOTE: UI
export const postOfficeToSelectSchema = z.object({
  value: z.string(),
  type: z.string(),
  label: z.string(),
});
