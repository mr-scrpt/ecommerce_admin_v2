import { z } from "zod";
import { PROPERTY_DATATYPE } from "./property.type";

// NOTE: Select Property Option
export const propertyDefaultSelectOptionSchema = z.object({
  value: z.string(),
  datatype: z.nativeEnum(PROPERTY_DATATYPE),
  label: z.string(),
  active: z.boolean().optional(),
});

export const propertyItemDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  propertyId: z.string(),
  active: z.boolean().optional(),
});

export type PropertyDefaultSelectOption = z.infer<
  typeof propertyDefaultSelectOptionSchema
>;

export type PropertyItemDefaultSelectOption = z.infer<
  typeof propertyItemDefaultSelectOptionSchema
>;

// NOTE: Select Property Datatype Option
export const propertyDataTypeDefaultSelectOptionSchema = z.object({
  value: z.string(),
  type: z.nativeEnum(PROPERTY_DATATYPE),
  label: z.string(),
  active: z.boolean().optional(),
});

export type PropertyDataTypeDefaultSelectOption = z.infer<
  typeof propertyDataTypeDefaultSelectOptionSchema
>;
