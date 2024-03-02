import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
import { z } from "zod";
import {
  propertyItemCreateSchema,
  propertyItemSchema,
  propertyItemUpdateSchema,
} from "../propertyItem/propertyItem.schema";

export const propertySchema = z.object({
  id: z.string(),
  name: z.string(),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
  createdAt: z.date(),
});

export const propertyRelationSchema = z.object({
  id: z.string(),
  name: z.string(),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
  createdAt: z.date(),

  propertyItemList: z.array(propertyItemSchema),

  categoryList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export const propertyCreateSchema = z.object({
  name: z.string(),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
  propertyItemList: z.array(propertyItemCreateSchema),
});

export const propertyUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
  propertyItemList: z.array(propertyItemUpdateSchema),
});

export const propertyFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
  propertyItemList: z.array(propertyItemUpdateSchema),
  // isPendingAppearance: z.boolean(),
  // submitText: z.string(),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
