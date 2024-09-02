import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import {
  OrderComposite,
  OrderCompositeEntity,
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order/order.type";
import { OrderRow } from "@/kernel/domain/order/orderRow.type";

// NOTE: Relations
export type OrderRelationEntity = OrderCompositeEntity & {
  delivery: Delivery | null;
};

export type OrderRelation = OrderComposite & {
  // orderRowList: Array<OrderRow>;
  delivery: Delivery;
};

// NOTE: Selector
export type OrderGetSelector = {
  id: string;
};

export type OrderGetByConsumerSelector = {
  consumerId: string;
};

// NOTE: Side
// export type OrderProduct = OrderRow & {
//   priceOrder: number;
//   quantity: number;
// };
//
// export type OrderDelivery = {
//   id: string;
// };

// NOTE: UI
export type OrderStatusGroup = {
  orderStatus: OrderStatusEnum;
  paymentStatus: OrderPaymentStatusEnum;
};
