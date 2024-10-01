import { z } from "zod";
import { PROPERTY_DATATYPE, Property } from "./property.type";
import { filterNullValues } from "@/shared/lib/filter";
import { PropertyItem } from "./propertyItem.type";

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

// NOTE: Build Property Option
export const buildPropertyOption = (
  property?: Property | null,
): PropertyDefaultSelectOption | null =>
  property
    ? {
        value: property.id,
        label: property.name,
        datatype: property.datatype,
      }
    : null;

export const buildPropertyOptionsArray = (
  property?: Array<Property> | null,
): PropertyDefaultSelectOption[] =>
  property ? filterNullValues(property.map(buildPropertyOption)) : [];

// NOTE: Build Property Item Option
export const buildPropertyItemOption = (
  property?: PropertyItem | null,
): PropertyItemDefaultSelectOption | null =>
  property
    ? {
        value: property.id,
        label: property.name,
        propertyId: property.propertyId,
      }
    : null;

export const buildPropertyItemOptionsArray = (
  property?: Array<PropertyItem> | null,
): PropertyItemDefaultSelectOption[] =>
  property ? filterNullValues(property.map(buildPropertyItemOption)) : [];
