import { z } from "zod";

// NOTE: Base
export const orderRowBaseSchema = z.object({
  orderId: z.string(),
  productId: z.string(),
  productName: z.string(),
  productArticle: z.string(),
  productImg: z.string(),

  quantity: z.number(),
  price: z.number(),
});

// NOTE: Projections
export const orderRowSchema = z.object({
  id: z.string(),
  ...orderRowBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
