import { ReplaceDateWithString } from "@/shared/type/operation.type";
import { ORDER_STATUS_PAYMENT, ORDER_STATUS_STATE } from "./orderStatus.type";
import { Order } from "./order.type";

export type OrderWithStringDate = ReplaceDateWithString<Order>;

export const ORDER_STATUS_STATE_LIST = [
  { type: ORDER_STATUS_STATE.TEMP, value: "Temp" },
  { type: ORDER_STATUS_STATE.NEW, value: "New" },
  { type: ORDER_STATUS_STATE.PENDING, value: "Pending" },
  { type: ORDER_STATUS_STATE.CALLED, value: "Called" },
  { type: ORDER_STATUS_STATE.NOT_CONTACTED, value: "Not contacted" },
  { type: ORDER_STATUS_STATE.COMPLETED, value: "Completed" },
  { type: ORDER_STATUS_STATE.CANCELED, value: "Canceled" },
];

export const ORDER_STATUS_PAYMENT_LIST = [
  { type: ORDER_STATUS_PAYMENT.TEMP, value: "Temp" },
  { type: ORDER_STATUS_PAYMENT.PAID, value: "Paid" },
  { type: ORDER_STATUS_PAYMENT.NOT_PAID, value: "Not paid" },
  { type: ORDER_STATUS_PAYMENT.POSTAL_PAID, value: "Postal paid" },
  { type: ORDER_STATUS_PAYMENT.CONTACT_PAID, value: "Contact paid" },
];

// NOTE: Default Select Options
// export const OrderStatusDefaultOption = {
//   label: OrderStatusEnum.NEW,
//   value: OrderStatusEnum.NEW,
// };
//
// export const OrderPaymentStatusDefaultOption = {
//   label: OrderPaymentStatusEnum.TEMP,
//   value: OrderPaymentStatusEnum.TEMP,
// };
