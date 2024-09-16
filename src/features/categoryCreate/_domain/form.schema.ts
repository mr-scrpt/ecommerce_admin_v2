import { categoryFormDefaultSchema } from "@/entities/category";
import { propertyItemDefaultSelectOptionSchema } from "@/kernel/domain/property/form.schema";
import { z } from "zod";

export const categoryCreateFormSchema = categoryFormDefaultSchema
  .extend({
    propertyList: z.array(propertyItemDefaultSelectOptionSchema),
  })
  .omit({
    categoryList: true,
  });

export type CategoryCreateFormValues = z.infer<typeof categoryCreateFormSchema>;

// TODO: DefaultValues
export const categoryCreateDefaultFieldsValues: CategoryCreateFormValues = {
  name: "",
  board: [],
  propertyList: [],
};
