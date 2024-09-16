import {
  PropertyItemDefaultSelectOption,
  propertyItemDefaultSelectOptionSchema,
} from "@/kernel/domain/property/form.schema";
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

export const propertyItemEmptyRow: PropertyItemDefaultSelectOption = {
  value: "",
  label: "",
};
