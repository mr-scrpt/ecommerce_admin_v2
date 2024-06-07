import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order.type";
import { OrderRow, OrderRowEntity } from "./orderRow.types";

// NOTE: Base
type OrderBase = {
  orderNo: number;
  userId: string;
  orderStatus: OrderStatusEnum;
  paymentStatus: OrderPaymentStatusEnum;
  priceTotal: number;
};

// NOTE: Entity
export type OrderEntity = OrderBase & {
  id: string;
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
  id: string;
  orderNo: number;
  userId: string;
  createdAt: Date;
  priceTotal: number;
};

export type OrderRelation = Order & {
  orderRowList: Array<OrderRow>;
};

// NOTE: Selector
export type OrderGetSelector = {
  id: string;
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
