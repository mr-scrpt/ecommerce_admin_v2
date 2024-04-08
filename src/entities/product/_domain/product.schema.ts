import { z } from "zod";

export const productBaseSchema = z.object({
  name: z.string(),
  article: z.string(),
  price: z.number().positive(),
  inStock: z.number().nonnegative(),
  slug: z.string(),

  description: z.string(),
  about: z.string(),

  img: z.array(z.string()),
});

export const productSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  ...productBaseSchema.shape,
});

export const productRelationSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  ...productBaseSchema.shape,

  categoryList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  propertyItemListSelected: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      value: z.string(),
      propertyId: z.string(),
    }),
  ),
});

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
