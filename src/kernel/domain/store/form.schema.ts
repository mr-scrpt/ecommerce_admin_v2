import { z } from "zod";

// NOTE: Select Store Option
export const storeDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  address: z.string(),
  name: z.string(),
  active: z.boolean().optional(),
});

export type StoreDefaultSelectOption = z.infer<
  typeof storeDefaultSelectOptionSchema
>;

// NOTE: Default Option
export const storeDefaultSelectOption: StoreDefaultSelectOption = {
  value: "",
  label: "",
};
