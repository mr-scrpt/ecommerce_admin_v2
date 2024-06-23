import { z } from "zod";
import { PropertyDataTypeEnum } from "./property.type";

// NOTE: Base
export const propertyBaseSchema = z.object({
  name: z.string(),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
});

// NOTE: Projections
export const propertySchema = z.object({
  id: z.string(),
  ...propertyBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
