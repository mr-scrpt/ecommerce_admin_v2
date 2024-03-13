import { z } from "zod";

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
});

export const orderRelationSchema = z.object({
  id: z.string(),
  userId: z.string(),

  orderRowList: z.array(
    z.object({
      id: z.string(),
      productId: z.string(),
      quantity: z.number(),
    }),
  ),
});

export const orderAddProductSchema = z.object({
  productId: z.string(),
  // quantity: z.number(),
});

export const orderRemoveProductSchema = z.object({
  productId: z.string(),
  // quantity: z.number(),
});

export const orderChangeCountProductSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

// export const orderCreateSchema = z.object({
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
// // export type OrderFormUpdateValues = z.infer<typeof orderUpdateSchema>;
//
// export const orderFormSchema = z.object({
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
// export type OrderFormValues = z.infer<typeof orderFormSchema>;
// // type DinamicField = Record<string, any>;
// //
// // export const generateOrderFormSchema = (
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
// // export type OrderFormValues = z.infer<typeof orderFormSchema>;
