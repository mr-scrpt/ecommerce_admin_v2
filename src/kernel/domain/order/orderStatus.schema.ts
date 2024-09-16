import { z } from "zod";
import { ORDER_STATUS_PAYMENT, ORDER_STATUS_STATE } from "./orderStatus.type";

// NOTE: Base Schema
export const orderStatusStateBaseSchema = z.object({
  status: z.nativeEnum(ORDER_STATUS_STATE),
});

export const orderStatusPaymentBaseSchema = z.object({
  status: z.nativeEnum(ORDER_STATUS_PAYMENT),
});

// NOTE: Projections
export const orderStatusStateSchema = z.object({
  id: z.string(),
  ...orderStatusStateBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const orderStatusPaymentSchema = z.object({
  id: z.string(),
  ...orderStatusPaymentBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const orderStatusSchema = z.object({
  orderStatusState: orderStatusStateSchema,
  orderStatusPayment: orderStatusPaymentSchema,
});

export const orderStatusListSchema = z.object({
  orderStatusStateList: z.array(orderStatusStateSchema),
  orderStatusPaymentList: z.array(orderStatusPaymentSchema),
});
