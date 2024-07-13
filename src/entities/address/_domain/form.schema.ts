import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const addressFormDefaultSchema = z.object({
  // settlementRef: z.string(),

  street: z.string(),
  house: z.string(),
  apartment: z.string(),
  addressId: z.string(),
  settlementRef: z.string(),
  userId: z.string(),
});

export type AddressFormDefaultValues = z.infer<typeof addressFormDefaultSchema>;
