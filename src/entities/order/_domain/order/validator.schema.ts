import { orderSchema } from "@/kernel/domain/order/order.schema";
import {
  orderStatusListSchema,
  orderStatusPaymentSchema,
  orderStatusStateSchema,
} from "@/kernel/domain/order/orderStatus.schema";
import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByOwnerInputSchema = z.object({
  consumerId: z.string(),
});

export const getListOutputSchema = z.array(orderSchema);

export const getStatusStateListSchema = z.array(orderStatusStateSchema);
export const getStatusPaymentListSchema = z.array(orderStatusPaymentSchema);

export const getStatusAvailableOutputSchema = orderStatusListSchema;
