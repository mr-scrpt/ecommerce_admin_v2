import { z } from "zod";

// NOTE: Select Staff Option
export const staffDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  active: z.boolean().optional(),
});

export type StaffDefaultSelectOption = z.infer<
  typeof staffDefaultSelectOptionSchema
>;
