import { z } from "zod";

// NOTE: Select Profile Option
export const profileDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  active: z.boolean().optional(),
});

export type ProfileDefaultSelectOption = z.infer<
  typeof profileDefaultSelectOptionSchema
>;
