import { z } from "zod";

// NOTE: Select Post Option
export const postDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});

export type PostDefaultSelectOption = z.infer<
  typeof postDefaultSelectOptionSchema
>;

// NOTE: Default Option
// export const postDefaultSelectOption: PostDefaultSelectOption = {
//   value: "",
//   label: "",
// };

export const postOfficeDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});

export type PostOfficeDefaultSelectOption = z.infer<
  typeof postOfficeDefaultSelectOptionSchema
>;

// NOTE: Default Option
// export const postOfficeDefaultSelectOption: PostOfficeDefaultSelectOption = {
//   value: "",
//   label: "",
// };
