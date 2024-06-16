import { z } from "zod";
import { OrderPaymentStatusEnum, OrderStatusEnum } from "./order.types";

// NOTE: FORM
// NOTE: Main information

export const orderFormDefaultSchema = z.object({
  orderNo: z.string(),
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});

export type OrderFormValues = z.infer<typeof orderFormDefaultSchema>;

// NOTE: Product information
export const orderStatusFormSchema = z.object({
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});

export type OrderStatusFormValues = z.infer<typeof orderStatusFormSchema>;

// NOTE: Select Owner
export const orderSelectOwnerFromSchema = z.object({
  ownerId: z.string(),
});

export type OrderSelectOwnerFormValues = z.infer<
  typeof orderSelectOwnerFromSchema
>;
