import { z } from "zod";

// NOTE: Form
export const productFormSchema = z.object({
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

  img: z.array(z.string()),

  categoryList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  propertyList: z.object({}),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
