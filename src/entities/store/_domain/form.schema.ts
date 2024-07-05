import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const storeFormDefaultSchema = z.object({
  settlementRef: z.string(),

  name: z.string(),
  address: z.string(),
  id: z.string(),
});

export type StoreFormDefaultValues = z.infer<typeof storeFormDefaultSchema>;
