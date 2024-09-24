import { categoryFormDefaultSchema } from "@/entities/category";
import { propertyDefaultSelectOptionSchema } from "@/kernel/domain/property/form.schema";
import { z } from "zod";

export const categoryUpdateFormSchema = categoryFormDefaultSchema
  .extend({
    propertyList: z.array(propertyDefaultSelectOptionSchema),
  })
  .omit({
    categoryList: true,
  });

export type CategoryUpdateFormValues = z.infer<typeof categoryUpdateFormSchema>;

// TODO: DefaultValues
export const categoryUpdateFieldsValues: CategoryUpdateFormValues = {
  name: "",
  board: [],
  propertyList: [],
};
