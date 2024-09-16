import { productDefaultSelectOptionSchema } from "@/kernel/domain/product/form.schema";
import { z } from "zod";

// NOTE: Form
export const productFormDefaultSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30)
    .transform((name) => name.trim()),
  article: z.string(),
  price: z.coerce.number().positive(),
  inStock: z.coerce.number().nonnegative(),

  description: z.string(),
  about: z.string(),

  imgList: z.array(z.string()),

  product: productDefaultSelectOptionSchema.optional().nullable(),
  productList: z.array(productDefaultSelectOptionSchema).optional(),
});

export type ProductFormDefaultValues<
  T extends z.ZodTypeAny = typeof productFormDefaultSchema,
> = z.infer<T>;

// TODO: DefaultValues
export const productDefaultFieldsValues: ProductFormDefaultValues = {
  name: "",
  article: "",
  price: 0,
  inStock: 0,
  description: "",
  about: "",
  imgList: [],
  product: null,
  productList: [],
};
