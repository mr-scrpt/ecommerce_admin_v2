import { z } from "zod";

// NOTE: UI
export const settleToSelectSchema = z.object({
  value: z.string(),
  area: z.string(),
  region: z.string(),
  label: z.string(),
});
