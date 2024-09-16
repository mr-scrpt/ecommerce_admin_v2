import { z } from "zod";

// NOTE: Select Receiver Option
export const receiverDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  name: z.string(),
  phone: z.string(),
  lastName: z.string(),
  active: z.boolean().optional(),
});

export type ReceiverDefaultSelectOption = z.infer<
  typeof receiverDefaultSelectOptionSchema
>;
