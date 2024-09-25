import { z } from "zod";
import {
  ORDER_STATUS_PAYMENT,
  ORDER_STATUS_STATE,
  OrderStatusPayment,
  OrderStatusState,
} from "./orderStatus.type";
import { Order } from "./order.type";
import { filterNullValues } from "@/shared/lib/filter";

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
// export const orderDefaultSelectOption: OrderDefaultSelectOption = {
//   value: "",
//   label: "",
// };
// export const orderRowDefaultSelectOption: OrderRowDefaultSelectOption = {
//   value: "",
//   label: "",
// };

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

// NOTE: Build Order Status Option
// NOTE: Payment
export const buildOrderPaymentStatusOption = (
  orderStatusPayment?: OrderStatusPayment | null,
): OrderStatusPaymentDefaultSelectOption | null =>
  orderStatusPayment
    ? {
        value: orderStatusPayment.id,
        label: orderStatusPayment.status,
      }
    : null;

export const buildOrderPaymentStatusOptionsArray = (
  orderStatusPayment?: Array<OrderStatusPayment | null | undefined> | null,
): Array<OrderStatusPaymentDefaultSelectOption> =>
  orderStatusPayment
    ? filterNullValues(orderStatusPayment.map(buildOrderPaymentStatusOption))
    : [];

// NOTE: State
export const buildOrderStateStatusOption = (
  orderStatusState?: OrderStatusState | null,
): OrderStatusStateDefaultSelectOption | null =>
  orderStatusState
    ? {
        value: orderStatusState.id,
        label: orderStatusState.status,
      }
    : null;

export const buildOrderStateStatusOptionsArray = (
  orderStatusState?: Array<OrderStatusState | null | undefined> | null,
): Array<OrderStatusStateDefaultSelectOption> =>
  orderStatusState
    ? filterNullValues(orderStatusState.map(buildOrderStateStatusOption))
    : [];
