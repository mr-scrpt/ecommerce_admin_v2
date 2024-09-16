import { z } from "zod";

// NOTE: Select Address Option
export const addressDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});

export type AddressDefaultSelectOption = z.infer<
  typeof addressDefaultSelectOptionSchema
>;
