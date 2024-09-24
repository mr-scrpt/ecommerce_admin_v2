import { Order, OrderEntity } from "@/kernel/domain/order/order.type";
import {
  Receiver,
  ReceiverEntity,
} from "@/kernel/domain/receiver/receiver.type";

// NOTE: Relations
export type ReceiverRelation = Receiver & {
  orderList: Array<Order>;
};

export type ReceiverRelationEntity = ReceiverEntity & {
  orderList: Array<OrderEntity>;
};

// NOTE: Selector
export type ReceiverGetSelector = {
  id: string;
};

export type ReceiverGetByUserSelector = {
  userId: string;
};
export type ReceiverGetByOrderSelector = {
  orderId: string;
};
