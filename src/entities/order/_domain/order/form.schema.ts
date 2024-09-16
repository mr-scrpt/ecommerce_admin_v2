import {
  orderStatusPaymentDefaultSelectOptionSchema,
  orderStatusStateDefaultSelectOptionSchema,
} from "@/kernel/domain/order/form.schema";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const orderFormDefaultSchema = z.object({
  orderStatusStateList: z.array(orderStatusStateDefaultSelectOptionSchema),
  orderStatusPaymentList: z.array(orderStatusPaymentDefaultSelectOptionSchema),
});

export type OrderFormDefaultValues = z.infer<typeof orderFormDefaultSchema>;

export const orderDefaultFieldsValues: OrderFormDefaultValues = {
  orderStatusStateList: [],
  orderStatusPaymentList: [],
};
