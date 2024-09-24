import { z } from "zod";
import { ORDER_STATUS_PAYMENT, ORDER_STATUS_STATE } from "./orderStatus.type";

// NOTE: Select Order Option
export const orderDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});
export const orderRowDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});

export type OrderDefaultSelectOption = z.infer<
  typeof orderDefaultSelectOptionSchema
>;
export type OrderRowDefaultSelectOption = z.infer<
  typeof orderRowDefaultSelectOptionSchema
>;

// NOTE: Default Option
export const orderDefaultSelectOption: OrderDefaultSelectOption = {
  value: "",
  label: "",
};
export const orderRowDefaultSelectOption: OrderRowDefaultSelectOption = {
  value: "",
  label: "",
};

// NOTE: Select Order Status State Option Schema
export const orderStatusStateDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.nativeEnum(ORDER_STATUS_STATE),
  active: z.boolean().optional(),
});

export type OrderStatusStateDefaultSelectOption = z.infer<
  typeof orderStatusStateDefaultSelectOptionSchema
>;

// NOTE: Select Order Payment Option Schema
export const orderStatusPaymentDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.nativeEnum(ORDER_STATUS_PAYMENT),
  active: z.boolean().optional(),
});

export type OrderStatusPaymentDefaultSelectOption = z.infer<
  typeof orderStatusPaymentDefaultSelectOptionSchema
>;
