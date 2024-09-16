import { categoryFormDefaultSchema } from "@/entities/category";
import { propertyItemDefaultSelectOptionSchema } from "@/kernel/domain/property/form.schema";
import { z } from "zod";

export const categoryUpdateFormSchema = categoryFormDefaultSchema
  .extend({
    propertyList: z.array(propertyItemDefaultSelectOptionSchema),
  })
  .omit({
    categoryList: true,
  });

export type CategoryUpdateFormValues = z.infer<typeof categoryUpdateFormSchema>;

// TODO: DefaultValues
export const categoryUpdateDefaultFieldsValues: CategoryUpdateFormValues = {
  name: "",
  board: [],
  propertyList: [],
};
