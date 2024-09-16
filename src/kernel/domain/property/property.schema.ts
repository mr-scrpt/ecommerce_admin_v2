import { z } from "zod";
import { propertyItemSchema } from "./propertyItem.schema";
import { PROPERTY_DATATYPE } from "./property.type";

// NOTE: Base
export const propertyBaseSchema = z.object({
  name: z.string(),
  datatype: z.nativeEnum(PROPERTY_DATATYPE),
});

// NOTE: Projections
export const propertySchema = z.object({
  id: z.string(),
  ...propertyBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});

// NOTE: Composite
export const propertyCompositeSchema = z.object({
  ...propertySchema.shape,
  propertyItemList: z.array(propertyItemSchema),
});
