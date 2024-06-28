import { orderSchema } from "@/kernel/domain/order/order.schema";
import { z } from "zod";

export const orderRowSelectorSchema = z.object({
  id: z.string(),
});

export const orderStatusUpdateSchema = orderSchema.pick({
  orderStatus: true,
});
export const orderPaymentStatusUpdateSchema = orderSchema.pick({
  paymentStatus: true,
});
