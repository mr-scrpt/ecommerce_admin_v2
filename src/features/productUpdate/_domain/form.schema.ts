import { productFormDefaultSchema } from "@/entities/product";
import { productDefaultFieldsValues } from "@/entities/product/_domain/form.schema";
import { categoryDefaultSelectOptionSchema } from "@/kernel/domain/category/form.schema";
import { propertyItemDefaultSelectOptionSchema } from "@/kernel/domain/property/form.schema";
import { z } from "zod";

export const productUpdateFormSchema = productFormDefaultSchema
  .extend({
    categoryList: z.array(categoryDefaultSelectOptionSchema),
    propertyItemList: z.array(propertyItemDefaultSelectOptionSchema),
    // propertyItemList: z.array(
    //   z.object({
    //     propertyId: z.string(),
    //     list: propertyItemDefaultSelectOptionSchema,
    //   }),
    // ),
  })
  .omit({ product: true, productList: true });

export type ProductUpdateFormValues = z.infer<typeof productUpdateFormSchema>;

// NOTE: Default Form Values
export const productUpdateFieldsValues: ProductUpdateFormValues = {
  ...productDefaultFieldsValues,
  categoryList: [],
  propertyItemList: [],
};
