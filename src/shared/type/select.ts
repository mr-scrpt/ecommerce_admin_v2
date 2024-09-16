import { z } from "zod";

// NOTE: Select Option
// export const selectItemSchema = <T extends z.ZodTypeAny = z.ZodString>(
//   valueSchema: T = z.string() as unknown as T,
// ) =>
//   z.object({
//     value: valueSchema,
//     label: z.string(),
//     active: z.boolean().optional(),
//   });
//
// const defaultStringSchema = selectItemSchema();

const defaultSelectOption = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});
// .nullable();

export type DefaultSelectOption = z.infer<typeof defaultSelectOption>;
//
// // NOTE: Select Option With Id
// export const selectItemWithIdSchema = <T extends z.ZodTypeAny = z.ZodString>(
//   valueSchema: T = z.string() as unknown as T,
// ) =>
//   z.object({
//     value: valueSchema,
//     label: z.string(),
//     id: z.string(),
//     active: z.boolean().optional(),
//   });

// const defaultSelectOptionWithId = z.object({
//   value: z.string(),
//   label: z.string(),
//   id: z.string(),
//   active: z.boolean().optional(),
// });
//
// export type DefaultSelectOptionWithId = z.infer<
//   typeof defaultSelectOptionWithId
// >;
//
// export const dataOptionItemSchema = z.object({
//   id: z.string(),
//   name: z.string(),
// });
//
// export type DataOptionItem = z.infer<typeof dataOptionItemSchema>;
