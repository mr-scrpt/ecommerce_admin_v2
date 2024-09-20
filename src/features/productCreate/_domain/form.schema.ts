import { productFormDefaultSchema } from "@/entities/product";
import { categoryDefaultSelectOptionSchema } from "@/kernel/domain/category/form.schema";
import { propertyItemDefaultSelectOptionSchema } from "@/kernel/domain/property/form.schema";
import { z } from "zod";

export const productCreateFormSchema = productFormDefaultSchema
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

export type ProductCreateFormValues = z.infer<typeof productCreateFormSchema>;

// TODO: Default Form Values
export const productCreateFieldsValues: ProductCreateFormValues = {
  name: "",
  article: "",
  description: "",
  price: 0,
  inStock: 0,
  about: "",
  imgList: [],
  categoryList: [],
  propertyItemList: [],

  // propertyItemList: [],
};
