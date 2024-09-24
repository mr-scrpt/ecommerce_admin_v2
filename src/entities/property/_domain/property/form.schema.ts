import {
  PropertyDefaultSelectOption,
  propertyDataTypeDefaultSelectOptionSchema,
  propertyDefaultSelectOptionSchema,
} from "@/kernel/domain/property/form.schema";
import { Property } from "@/kernel/domain/property/property.type";
import { filterNullValues } from "@/shared/lib/filter";
import { z } from "zod";

export const propertyFormDefaultSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  datatypeList: z.array(propertyDataTypeDefaultSelectOptionSchema),
  propertyList: z.array(propertyDefaultSelectOptionSchema).optional(),
});

export type PropertyFormDefaultValues<
  T extends z.ZodTypeAny = typeof propertyFormDefaultSchema,
> = z.infer<T>;

// TODO: DefaultValues
export const propertyDefaultFieldsValues: PropertyFormDefaultValues = {
  name: "",
  datatypeList: [],
  propertyList: [],
};

// NOTE: Build Post Office Option
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

export const buildPropertySingleOptionsArray = (
  property?: Property | null,
): PropertyDefaultSelectOption[] =>
  property ? filterNullValues([buildPropertyOption(property)]) : [];

export const buildPropertyOptionsArray = (
  property?: Array<Property> | null,
): PropertyDefaultSelectOption[] =>
  property ? filterNullValues(property.map(buildPropertyOption)) : [];
