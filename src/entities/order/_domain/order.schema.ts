import { z } from "zod";
import { OrderPaymentStatusEnum, OrderStatusEnum } from "./order.types";
import { orderRowSchema } from "./orderRow.schema";

const orderBaseSchema = z.object({
  orderNo: z.string(),
  userId: z.string(),
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
  createdAt: z.date(),
});
export const orderSchema = z.object({
  id: z.string(),
  ...orderBaseSchema.shape,
});

export const orderRelationSchema = z.object({
  id: z.string(),
  ...orderBaseSchema.shape,

  orderRowList: orderRowSchema.array(),
});

export const orderUpdateStausSchema = z.object({
  id: z.string(),
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});

// NOTE: FORM
// NOTE: Main information

export const orderFormGeneralSchema = z.object({
  orderNo: z.string(),
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});

export type OrderFormValues = z.infer<typeof orderFormGeneralSchema>;

// NOTE: Product information
export const orderFormProductSchema = z.object({
  orderProductToAdd: z.string(),
});

export type OrderFormProductValues = z.infer<typeof orderFormProductSchema>;
