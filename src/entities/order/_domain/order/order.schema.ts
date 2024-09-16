import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import { orderRowSchema } from "@/kernel/domain/order/orderRow.schema";
import {
  orderStatusPaymentSchema,
  orderStatusStateSchema,
} from "@/kernel/domain/order/orderStatus.schema";
import { z } from "zod";

// NOTE: Relation

export const orderRelationSchema = z.object({
  ...orderSchema.shape,
  orderStatusState: orderStatusStateSchema,
  orderStatusPayment: orderStatusPaymentSchema,
  orderRowList: orderRowSchema.array(),
  delivery: deliverySchema,
});
