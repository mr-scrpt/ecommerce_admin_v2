import { ReplaceDateWithString } from "@/shared/type/operation.type";
import { Order, OrderPaymentStatusEnum, OrderStatusEnum } from "./order.type";

export type OrderWithStringDate = ReplaceDateWithString<Order>;

export const ORDER_STATUS_LIST = [
  { type: OrderStatusEnum.TEMP, value: "Temp" },
  { type: OrderStatusEnum.NEW, value: "New" },
  { type: OrderStatusEnum.PENDING, value: "Pending" },
  { type: OrderStatusEnum.CALLED, value: "Called" },
  { type: OrderStatusEnum.NOT_CONTACTED, value: "Not contacted" },
  { type: OrderStatusEnum.COMPLETED, value: "Completed" },
  { type: OrderStatusEnum.CANCELED, value: "Canceled" },
];

export const ORDER_PAYMENT_STATUS_LIST = [
  { type: OrderPaymentStatusEnum.TEMP, value: "Temp" },
  { type: OrderPaymentStatusEnum.PAID, value: "Paid" },
  { type: OrderPaymentStatusEnum.NOT_PAID, value: "Not paid" },
  { type: OrderPaymentStatusEnum.POSTAL_PAID, value: "Postal paid" },
  { type: OrderPaymentStatusEnum.CONTACT_PAID, value: "Contact paid" },
];

// NOTE: Default Select Options
export const OrderStatusDefaultOption = {
  label: OrderStatusEnum.NEW,
  value: OrderStatusEnum.NEW,
};

export const OrderPaymentStatusDefaultOption = {
  label: OrderPaymentStatusEnum.TEMP,
  value: OrderPaymentStatusEnum.TEMP,
};
