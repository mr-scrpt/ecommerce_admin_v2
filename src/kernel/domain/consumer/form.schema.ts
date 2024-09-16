import { z } from "zod";

// NOTE: Select Consumer Option
export const consumerDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  active: z.boolean().optional(),
});

export type ConsumerDefaultSelectOption = z.infer<
  typeof consumerDefaultSelectOptionSchema
>;
