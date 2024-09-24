import {
  Delivery,
  DeliveryEntity,
} from "@/kernel/domain/delivery/delivery.type";
import { Order, OrderEntity } from "@/kernel/domain/order/order.type";
import { OrderRow, OrderRowEntity } from "@/kernel/domain/order/orderRow.type";
import {
  OrderStatusPayment,
  OrderStatusPaymentEntity,
  OrderStatusState,
  OrderStatusStateEntity,
} from "@/kernel/domain/order/orderStatus.type";
import {
  Receiver,
  ReceiverEntity,
} from "@/kernel/domain/receiver/receiver.type";

// NOTE: Relations
export type OrderRelationEntity = OrderEntity & {
  orderRowList: Array<OrderRowEntity>;
  orderStatusState: OrderStatusStateEntity;
  orderStatusPayment: OrderStatusPaymentEntity;
  delivery: DeliveryEntity | null;
  receiver: ReceiverEntity | null;
};

export type OrderRelation = Order & {
  orderRowList: Array<OrderRow>;
  orderStatusState: OrderStatusState;
  orderStatusPayment: OrderStatusPayment;
  delivery: Delivery | null;
  receiver: Receiver | null;
};

// NOTE: Selector
export type OrderGetSelector = {
  id: string;
};

export type OrderGetByConsumerSelector = {
  consumerId: string;
};
