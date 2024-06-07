import {
  OrderDBType,
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order.type";
import { Order } from "./order.types";

export const orderToEnumMap = (order: OrderDBType): Order => ({
  ...order,
  orderStatus: order.orderStatus as OrderStatusEnum,
  paymentStatus: order.paymentStatus as OrderPaymentStatusEnum,
});
