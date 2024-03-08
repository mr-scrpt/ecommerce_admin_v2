import { z } from "zod";

export const cartSchema = z.object({
  id: z.string(),
  userId: z.string(),
});

export const cartRelationSchema = z.object({
  id: z.string(),
  userId: z.string(),

  cartRowList: z.array(
    z.object({
      id: z.string(),
      productId: z.string(),
      quantity: z.number(),
    }),
  ),
});

export const cartAddProductSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export const cartRemoveProductSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

// export const cartCreateSchema = z.object({
//   name: z.string(),
//   description: z.string(),
//   about: z.string(),
//   img: z.array(z.string()),
//   categoryList: z.array(
//     z.object({
//       id: z.string(),
//     }),
//   ),
// });
//
//
// // export type CartFormUpdateValues = z.infer<typeof cartUpdateSchema>;
//
// export const cartFormSchema = z.object({
//   name: z
//     .string()
//     .min(3)
//     .max(30)
//     .transform((name) => name.trim()),
//   description: z.string(),
//   about: z.string(),
//   img: z.array(z.string()),
//   categoryList: z.array(
//     z.object({
//       id: z.string(),
//       name: z.string(),
//     }),
//   ),
//   propertyList: z.object({}),
// });
//
// export type CartFormValues = z.infer<typeof cartFormSchema>;
// // type DinamicField = Record<string, any>;
// //
// // export const generateCartFormSchema = (
// //   dinamicFieldList: Array<DinamicField>,
// // ) =>
// //   z.object({
// //     name: z
// //       .string()
// //       .min(3)
// //       .max(30, {
// //         message: "Username must not be longer than 30 characters.",
// //       })
// //       .transform((name) => name.trim()),
// //     description: z.string(),
// //     about: z.string(),
// //     img: z.array(z.string()),
// //     categoryList: z.array(
// //       z.object({
// //         id: z.string(),
// //       }),
// //     ),
// //   });
// //
// // export type CartFormValues = z.infer<typeof cartFormSchema>;
