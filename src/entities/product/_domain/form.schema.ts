import { selectItemSchema } from "@/shared/type/select";
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

  // categoryList: z.array(
  //   z.object({
  //     id: z.string(),
  //     name: z.string(),
  //   }),
  // ),
  // propertyList: z.object({}),
  product: selectItemSchema(z.string()).optional(),
  productList: z.array(selectItemSchema(z.string())).optional(),
});

export type ProductFormDefaultValues<
  T extends z.ZodTypeAny = typeof productFormDefaultSchema,
> = z.infer<T>;

// TODO: DefaultValues
export const defaultFieldsValues: ProductFormDefaultValues = {
  name: "",
  article: "",
  price: 0,
  inStock: 0,
  description: "",
  about: "",
  imgList: [],
  product: { label: "", value: "" },
  productList: [],
};
