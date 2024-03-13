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
});

export const cartRemoveProductSchema = z.object({
  productId: z.string(),
});

export const cartChangeCountProductSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});
