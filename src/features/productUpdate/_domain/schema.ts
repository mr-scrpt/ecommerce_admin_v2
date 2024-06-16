import { productBaseSchema } from "@/entities/product/server";
import { z } from "zod";

// export const productUpdateSchema = z.object({
//   id: z.string(),
//
//   ...productBaseSchema.omit({ slug: true }).shape,
//
//   categoryList: z.array(
//     z.object({
//       id: z.string(),
//     }),
//   ),
//   propertyItemListSelected: z.array(z.object({ id: z.string() })),
// });
//
//
export const productSelectorSchema = z.object({
  id: z.string(),
});
export const productUpdateSchema = productBaseSchema.omit({
  slug: true,
  createdAt: true,
});

export const productPropertyItemSchema = z.object({
  propertyItemId: z.string(),
});

export const productCategorySchema = z.object({
  categoryId: z.string(),
});
