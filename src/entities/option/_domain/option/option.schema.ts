import { OptionDataTypeEnum } from "@/shared/type/optionDataType.enum";
import { z } from "zod";
import {
  optionItemCreateSchema,
  optionItemSchema,
  optionItemUpdateSchema,
} from "../optionItem/optionItem.schema";

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

  optionItemList: z.array(optionItemSchema),

  categoryList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export const optionCreateSchema = z.object({
  name: z.string(),
  datatype: z.nativeEnum(OptionDataTypeEnum),
  optionItemList: z.array(optionItemCreateSchema),
});

export const optionUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  datatype: z.nativeEnum(OptionDataTypeEnum),
  optionItemList: z.array(optionItemUpdateSchema),
});

export const optionFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  datatype: z.nativeEnum(OptionDataTypeEnum),
  optionItemList: z.array(optionItemUpdateSchema),
  isPendingAppearance: z.boolean(),
  submitText: z.string(),
});

export type OptionFormValues = z.infer<typeof optionFormSchema>;
