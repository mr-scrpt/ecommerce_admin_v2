import {
  Order as OrderDBType,
  ORDER_PAYMENT_STATUS as OrderPaymentStatusEnum,
  ORDER_STATUS as OrderStatusEnum,
} from "@prisma/client";
import { OrderRow, OrderRowEntity } from "./orderRow.types";

export const baseQueryKey = "order";

export type OrderId = string;
export type OrderSlug = string;

export { OrderStatusEnum, OrderPaymentStatusEnum };

export const orderToEnumMap = (order: OrderDBType): Order => ({
  ...order,
  orderStatus: order.orderStatus as OrderStatusEnum,
  paymentStatus: order.paymentStatus as OrderPaymentStatusEnum,
});

type OrderBase = {
  orderNo: string;
  userId: string;
  orderStatus: OrderStatusEnum;
  paymentStatus: OrderPaymentStatusEnum;
  priceTotal: number;
};

export type OrderEntity = OrderBase & {
  id: OrderId;
  createdAt: Date;
};

export type OrderRelationEntity = OrderEntity & {
  orderRowList: Array<OrderRowEntity>;
};

// NOTE: Projetions
export type OrderStatusGroup = {
  orderStatus: OrderStatusEnum;
  paymentStatus: OrderPaymentStatusEnum;
};

export type Order = OrderStatusGroup & {
  id: OrderId;
  orderNo: string;
  userId: string;
  createdAt: Date;
  priceTotal: number;
};

export type OrderRelation = Order & {
  orderRowList: Array<OrderRow>;
};

// NOTE: Actions
export type OrderToUpdateStatus = OrderStatusGroup & {
  id: OrderId;
};

// NOTE: Side
export type OrderProduct = OrderRow & {
  priceOrder: number;
  quantity: number;
};

// NOTE: UI
export type OrderUI = Omit<Order, "createdAt"> & {
  createdAt: string;
};
