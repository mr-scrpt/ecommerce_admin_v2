import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const storeFormDefaultSchema = z.object({
  name: z.string(),
  settlement: z.string(),
  address: z.string(),
});

export type StoreFormDefaultValues = z.infer<typeof storeFormDefaultSchema>;
