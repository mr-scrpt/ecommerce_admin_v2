import { PropertyDataTypeEnum } from "@/kernel/domain/property.type";
import { z } from "zod";
import { propertyItemSchema } from "../propertyItem/propertyItem.schema";

// NOTE: Side
const propertyCategoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// NOTE: Base
export const propertyBaseSchema = z.object({
  name: z.string(),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
  createdAt: z.date(),
});

// NOTE: Main
export const propertySchema = z.object({
  id: z.string(),
  ...propertyBaseSchema.shape,
});

export const propertyRelationSchema = z.object({
  id: z.string(),
  ...propertyBaseSchema.shape,

  propertyItemList: z.array(propertyItemSchema),

  categoryList: z.array(propertyCategoryItemSchema),
});

// export const propertyCreateSchema = z.object({
//   name: z.string(),
//   datatype: z.nativeEnum(PropertyDataTypeEnum),
//   propertyItemList: z.array(propertyItemCreateSchema),
// });
//
// export const propertyUpdateSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   datatype: z.nativeEnum(PropertyDataTypeEnum),
//   propertyItemList: z.array(propertyItemUpdateSchema),
// });
