import { categorySchema } from "@/kernel/domain/category/category.schema";
import {
  propertyBaseSchema,
  propertySchema,
} from "@/kernel/domain/property/property.schema";
import { propertyItemSchema } from "@/kernel/domain/property/propertyItem.schema";
import { z } from "zod";

// NOTE: Side
// const propertyCategoryItemSchema = z.object({
//   id: z.string(),
//   name: z.string(),
// });

export const propertyRelationSchema = z.object({
  ...propertySchema.shape,

  propertyItemList: z.array(propertyItemSchema),

  categoryList: z.array(categorySchema),
  // categoryList: z.array(propertyCategoryItemSchema),
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
