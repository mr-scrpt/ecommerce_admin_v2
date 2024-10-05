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
  propertyItemName: z.string(),
  propertyItemValue: z.string(),
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
  propertyList?: Array<Property> | null,
): PropertyDefaultSelectOption[] =>
  propertyList ? filterNullValues(propertyList.map(buildPropertyOption)) : [];

// NOTE: Build Property Item Option
export const buildPropertyItemOption = (
  propertyItem?: PropertyItem | null,
): PropertyItemDefaultSelectOption | null =>
  propertyItem
    ? {
        value: propertyItem.id,
        propertyItemName: propertyItem.name,
        propertyItemValue: propertyItem.value,
        propertyId: propertyItem.propertyId,
      }
    : null;

export const buildPropertyItemOptionsArray = (
  propertyItemList?: Array<PropertyItem> | null,
): PropertyItemDefaultSelectOption[] =>
  propertyItemList
    ? filterNullValues(propertyItemList.map(buildPropertyItemOption))
    : [];

// NOTE: Build Datatype Property Option
export const buildPropertyDataTypeOption = (
  property?: Property | null,
): PropertyDataTypeDefaultSelectOption | null =>
  property
    ? {
        value: property.datatype,
        label: property.name,
        type: property.datatype,
      }
    : null;

export const buildPropertyDataTypeOptionsArray = (
  propertyList?: Array<Property | null> | null,
): PropertyDataTypeDefaultSelectOption[] =>
  propertyList
    ? filterNullValues(propertyList.map(buildPropertyDataTypeOption))
    : [];
