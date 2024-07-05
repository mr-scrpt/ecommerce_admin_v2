import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const addressFormDefaultSchema = z.object({
  settlementRef: z.string(),

  street: z.string(),
  house: z.string(),
  apartment: z.string(),
});

export type AddressFormValues = z.infer<typeof addressFormDefaultSchema>;
