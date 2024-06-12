import { productBaseSchema } from "@/entities/product/server";
import { z } from "zod";

// export const productCreateSchema = z.object({
//   ...productBaseSchema.omit({ slug: true }).shape,
//
//   categoryList: z.array(
//     z.object({
//       id: z.string(),
//     }),
//   ),
//   propertyItemListSelected: z.array(z.object({ id: z.string() })),
// });
export const productCreateSchema = productBaseSchema.omit({ slug: true });

export const productPropertyItemSchema = z.object({
  propertyItemId: z.string(),
});

export const productCategorySchema = z.object({
  categoryId: z.string(),
});
