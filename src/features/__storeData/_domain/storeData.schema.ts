import { z } from "zod";

// NOTE: UI
export const storeToSelectSchema = z.object({
  value: z.string(),
  label: z.string(),
});
