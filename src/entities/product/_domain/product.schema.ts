import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),

  name: z.string(),
  article: z.string(),
  price: z.number().positive(),
  inStock: z.number().nonnegative(),
  slug: z.string(),

  description: z.string(),
  about: z.string(),

  img: z.array(z.string()),

  createdAt: z.date(),
});

export const productRelationSchema = z.object({
  id: z.string(),

  name: z.string(),
  article: z.string(),
  price: z.number().positive(),
  inStock: z.number().nonnegative(),
  slug: z.string(),

  description: z.string(),
  about: z.string(),

  img: z.array(z.string()),

  createdAt: z.date(),

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

export const productCreateSchema = z.object({
  name: z.string(),
  article: z.string(),
  inStock: z.number().nonnegative(),

  price: z.number().positive(),

  description: z.string(),
  about: z.string(),

  img: z.array(z.string()),

  categoryList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
  propertyItemListSelected: z.array(z.object({ id: z.string() })),
});

export const productUpdateSchema = z.object({
  id: z.string(),

  name: z.string(),
  article: z.string(),
  price: z.number().positive(),
  inStock: z.number().nonnegative(),

  description: z.string(),
  about: z.string(),

  img: z.array(z.string()),

  categoryList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
  propertyItemListSelected: z.array(z.object({ id: z.string() })),
});

// export type ProductFormUpdateValues = z.infer<typeof productUpdateSchema>;

export const productFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30)
    .transform((name) => name.trim()),
  article: z.string(),
  price: z.coerce.number().positive(),
  inStock: z.number().nonnegative(),

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
// type DinamicField = Record<string, any>;
//
// export const generateProductFormSchema = (
//   dinamicFieldList: Array<DinamicField>,
// ) =>
//   z.object({
//     name: z
//       .string()
//       .min(3)
//       .max(30, {
//         message: "Username must not be longer than 30 characters.",
//       })
//       .transform((name) => name.trim()),
//     description: z.string(),
//     about: z.string(),
//     img: z.array(z.string()),
//     categoryList: z.array(
//       z.object({
//         id: z.string(),
//       }),
//     ),
//   });
//
// export type ProductFormValues = z.infer<typeof productFormSchema>;
