import { CartComposite } from "@/kernel/domain/cart/cart.type";
import {
  Consumer,
  ConsumerEntity,
} from "@/kernel/domain/consumer/consumer.type";
import { Order, OrderEntity } from "@/kernel/domain/order/order.type";
import {
  Receiver,
  ReceiverEntity,
} from "@/kernel/domain/receiver/receiver.type";

// NOTE: Relation
export type ConsumerRelation = Consumer & {
  orderList: Array<Order>;
  cart: CartComposite | null;
  // TODO: Add reciver
  receiverList: Array<Receiver>;
};

export type ConsumerRelationEntity = ConsumerEntity & {
  orderList: Array<OrderEntity>;
  cart: CartComposite | null;
  // TODO: Add reciver
  receiverList: Array<ReceiverEntity>;
};

// NOTE: Selector
export type ConsumerGetSelector = {
  id: string;
};

export type ConsumerGetByOrderSelector = {
  orderId: string;
};

export type ConsumerSearchSelector = {
  q: string;
};

// NOTE: UI
// export type ConsumerRelationUI = {
//   consumer?: ConsumerUI;
//   orderList?: Array<OrderUI>;
//   cart?: CartComposite | null;
//   // TODO: Add reciver
//   receiverList?: Array<any>;
// };
