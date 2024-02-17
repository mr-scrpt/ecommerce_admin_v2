import { z } from "zod";
import { OptionDataTypeEnum } from "../..";

export const optionSchema = z.object({
  id: z.string(),
  name: z.string(),
  datatype: z.nativeEnum(OptionDataTypeEnum),
  createdAt: z.date(),
});

export const optionRelationSchema = z.object({
  id: z.string(),
  name: z.string(),
  datatype: z.nativeEnum(OptionDataTypeEnum),
  createdAt: z.date(),

  optionItemList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      value: z.string(),
    }),
  ),
  categoryList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export const optionCreateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
});

export const optionUpdateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
});

export const optionFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  board: z.array(z.string()),
});

export type OptionFormValues = z.infer<typeof optionFormSchema>;
