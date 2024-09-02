import { cartRowBaseSchema } from "@/kernel/domain/cart/cartRow.schema";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import { z } from "zod";

// NOTE: Order Update
export const orderSelectorSchema = z.object({
  id: z.string(),
});

export const orderStatusUpdateSchema = orderSchema.pick({
  orderStatus: true,
});
export const orderPaymentStatusUpdateSchema = orderSchema.pick({
  paymentStatus: true,
});

// NOTE: Order Row Create
export const orderRowSelectorSchema = z.object({
  orderId: z.string(),
});
export const orderRowCreateSchema = cartRowBaseSchema.pick({
  productId: true,
  quantity: true,
});
