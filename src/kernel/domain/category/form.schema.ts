import { z } from "zod";

// NOTE: Select Category Option
export const categoryDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});

export type CategoryDefaultSelectOption = z.infer<
  typeof categoryDefaultSelectOptionSchema
>;
