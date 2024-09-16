import { cartRowBaseSchema } from "@/kernel/domain/cart/cartRow.schema";
import {
  orderStatusPaymentSchema,
  orderStatusStateSchema,
} from "@/kernel/domain/order/orderStatus.schema";
import { z } from "zod";

// NOTE: Order Update
export const orderSelectorSchema = z.object({
  id: z.string(),
});

export const orderStatusStateUpdateSchema = orderStatusStateSchema.pick({
  id: true,
});
export const orderStatusPaymentUpdateSchema = orderStatusPaymentSchema.pick({
  id: true,
});
// export const orderStatusStateUpdateSchema = orderRelationSchema.pick({
//   orderStatusState: true,
// });
// export const orderStatusPaymentUpdateSchema = orderRelationSchema.pick({
//   orderStatusPayment: true,
// });

// NOTE: Order Row Create
export const orderRowSelectorSchema = z.object({
  orderId: z.string(),
});
export const orderRowCreateSchema = cartRowBaseSchema.pick({
  productId: true,
  quantity: true,
});
