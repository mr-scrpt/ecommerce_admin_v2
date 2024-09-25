import {
  PropertyItemDefaultSelectOption,
  propertyItemDefaultSelectOptionSchema,
} from "@/kernel/domain/property/form.schema";
import { PropertyItem } from "@/kernel/domain/property/propertyItem.type";
import { filterNullValues } from "@/shared/lib/filter";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const propertyItemFormSchema = z.object({
  propertyItemList: z.array(propertyItemDefaultSelectOptionSchema),
});

export type PropertyItemFormDefaultValues<
  T extends z.ZodTypeAny = typeof propertyItemFormSchema,
> = z.infer<T>;

// TODO: DefaultValues
export const propertyItemDefaultFieldsValues: PropertyItemFormDefaultValues = {
  propertyItemList: [],
};

// export const propertyItemEmptyRow: PropertyItemDefaultSelectOption = {
//   value: "",
//   label: "",
// };
// NOTE: Build Post Office Option
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
