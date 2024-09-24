import { z } from "zod";

// NOTE: Select Address Option
export const addressDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  street: z.string(),
  house: z.string(),
  apartment: z.string().nullable(),
  active: z.boolean().optional(),
});

export type AddressDefaultSelectOption = z.infer<
  typeof addressDefaultSelectOptionSchema
>;
