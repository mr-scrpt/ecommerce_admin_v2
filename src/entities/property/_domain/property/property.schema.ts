import { PropertyDataTypeEnum } from "@/kernel/domain/property.enum";
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
