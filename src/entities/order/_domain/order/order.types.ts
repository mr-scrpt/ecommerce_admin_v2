import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import { Order, OrderEntity } from "@/kernel/domain/order/order.type";
import { OrderRow, OrderRowEntity } from "@/kernel/domain/order/orderRow.type";
import {
  OrderStatusPayment,
  OrderStatusPaymentEntity,
  OrderStatusState,
  OrderStatusStateEntity,
} from "@/kernel/domain/order/orderStatus.type";

// NOTE: Relations
export type OrderRelationEntity = OrderEntity & {
  delivery: Delivery | null;
  orderRowList: Array<OrderRowEntity>;
  orderStatusState: OrderStatusStateEntity;
  orderStatusPayment: OrderStatusPaymentEntity;
};

export type OrderRelation = Order & {
  delivery: Delivery;
  orderRowList: Array<OrderRow>;
  orderStatusState: OrderStatusState;
  orderStatusPayment: OrderStatusPayment;
};

// NOTE: Selector
export type OrderGetSelector = {
  id: string;
};

export type OrderGetByConsumerSelector = {
  consumerId: string;
};
