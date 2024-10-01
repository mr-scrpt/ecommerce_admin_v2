import { orderSchema } from "@/kernel/domain/order/order.schema";
import {
  orderStatusListSchema,
  orderStatusPaymentSchema,
  orderStatusStateSchema,
} from "@/kernel/domain/order/orderStatus.schema";
import { z } from "zod";
import { orderRelationSchema } from "./order.schema";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByOwnerInputSchema = z.object({
  consumerId: z.string(),
});

// export const getByOrderInputSchema = z.object({
//   orderId: z.string(),
// });

export const getListOutputSchema = z.array(orderSchema);
export const getListRelationOutputSchema = z.array(orderRelationSchema);

export const getStatusStateListSchema = z.array(orderStatusStateSchema);
export const getStatusPaymentListSchema = z.array(orderStatusPaymentSchema);

export const getStatusAvailableOutputSchema = orderStatusListSchema;
