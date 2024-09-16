import { z } from "zod";

// NOTE: Select Product Option
export const productDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});

export type ProductDefaultSelectOption = z.infer<
  typeof productDefaultSelectOptionSchema
>;

// NOTE: Default Option
// export const productDefaultSelectOption: ProductDefaultSelectOption = {
//   value: "",
//   label: "",
// };
