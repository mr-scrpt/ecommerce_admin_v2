import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const addressFormDefaultSchema = z.object({
  street: z.string(),
  house: z.string(),
  apartment: z.string(),
  // settlementRef: z.string(),
  // userId: z.string(),

  addressList: z.array(selectItemSchema(z.string())).optional(),
});

// export type AddressFormDefaultValues = z.infer<typeof addressFormDefaultSchema>;
export type AddressFormDefaultValues<
  T extends z.ZodTypeAny = typeof addressFormDefaultSchema,
> = z.infer<T>;
