import {
  propertyDataTypeDefaultSelectOptionSchema,
  propertyDefaultSelectOptionSchema,
} from "@/kernel/domain/property/form.schema";
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
