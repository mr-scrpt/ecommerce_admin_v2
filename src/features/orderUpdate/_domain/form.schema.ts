import { orderFormDefaultSchema } from "@/entities/order";
import { orderDefaultFieldsValues } from "@/entities/order/_domain/order/form.schema";
import { z } from "zod";

// NOTE: Order update
export const orderUpdateFormSchema = orderFormDefaultSchema;

export type OrderUpdateFormValues = z.infer<typeof orderUpdateFormSchema>;

// NOTE: Default Form Values
export const orderUpdateFieldsValues: OrderUpdateFormValues = {
  ...orderDefaultFieldsValues,
};
