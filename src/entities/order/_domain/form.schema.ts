import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order/order.type";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const orderFormDefaultSchema = z.object({
  orderNo: z.string(),
  orderStatus: z.nativeEnum(OrderStatusEnum),
  paymentStatus: z.nativeEnum(OrderPaymentStatusEnum),
});

export type OrderFormValues = z.infer<typeof orderFormDefaultSchema>;

// NOTE: Product information
export const orderStatusFormSchema = z.object({
  orderStatus: z.nativeEnum(OrderStatusEnum),
  paymentStatus: z.nativeEnum(OrderPaymentStatusEnum),
});

export type OrderStatusFormValues = z.infer<typeof orderStatusFormSchema>;
