import { orderSchema } from "@/kernel/domain/order/order.schema";
import { z } from "zod";

export const orderRowSelectorSchema = z.object({
  id: z.string(),
});

export const orderStatusUpdateSchema = orderSchema.shape.orderStatus;
export const orderPaymentStatusUpdateSchema = orderSchema.shape.paymentStatus;
