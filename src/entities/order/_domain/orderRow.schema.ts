import { z } from "zod";

const orderRowBaseSchema = z.object({
  orderId: z.string(),
  productId: z.string(),
  productName: z.string(),
  productArticle: z.string(),
  productImg: z.string(),

  quantity: z.number(),
  price: z.number(),
  createdAt: z.date(),
});

export const orderRowSchema = z.object({
  id: z.string(),
  ...orderRowBaseSchema.shape,
});

export const orderRowAddSchema = z.object({
  // orderId: z.string(),
  productId: z.string(),
  quantity: z.number(),
});
