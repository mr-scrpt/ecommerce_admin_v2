import { z } from "zod";

import {
  orderPaymentStatusUpdateSchema,
  orderRowCreateSchema,
  orderRowSelectorSchema,
  orderSelectorSchema,
  orderStatusUpdateSchema,
} from "./schema";

export const updateInputSchema = z.object({
  selector: orderSelectorSchema,
  orderStatusData: orderStatusUpdateSchema.shape.orderStatus,
  orderPaymentStatusData: orderPaymentStatusUpdateSchema.shape.paymentStatus,
});

export const createRowInputSchema = z.object({
  selector: orderRowSelectorSchema,
  orderRowData: orderRowCreateSchema,
});
