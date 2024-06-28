import { z } from "zod";
import {
  orderPaymentStatusUpdateSchema,
  orderRowSelectorSchema,
  orderStatusUpdateSchema,
} from "./schema";
import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order/order.type";

export const updateInputSchema = z.object({
  selector: orderRowSelectorSchema,
  orderStatusData: orderStatusUpdateSchema.shape.orderStatus,
  orderPaymentStatusData: orderPaymentStatusUpdateSchema.shape.paymentStatus,
  // orderStatusData: z.nativeEnum(OrderStatusEnum),
  // orderPaymentStatusData: z.nativeEnum(OrderPaymentStatusEnum),
});
