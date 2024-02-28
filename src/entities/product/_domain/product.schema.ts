import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  about: z.string(),
  img: z.array(z.string()),
  createdAt: z.date(),
});

export const productRelationSchema = z.object({
  id: z.string(),
  name: z.string(),
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
  description: z.string(),
  about: z.string(),
  img: z.array(z.string()),
  categoryList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

export const productUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  about: z.string(),
  img: z.array(z.string()),
  categoryList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

export const productFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30)
    .transform((name) => name.trim()),
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
