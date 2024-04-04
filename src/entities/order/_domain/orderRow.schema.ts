import { z } from "zod";
import { orderSelectOwnerSchema } from "./order.schema";

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
  productId: z.string(),
  quantity: z.number(),
});

export const orderRowRemoveSchema = z.object({
  id: z.string(),
});

// NOTE: FORM

// NOTE: Main information
export const orderRowAddForm = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export type OrderRowAddValues = z.infer<typeof orderRowAddForm>;
