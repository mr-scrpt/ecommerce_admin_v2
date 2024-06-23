import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import {
  Order,
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
  orderRowList: Array<OrderRow>;
  delivery: Delivery;
};

// NOTE: Selector
export type OrderGetSelector = {
  id: string;
};

export type OrderGetByOwnerSelector = {
  ownerId: string;
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
export type OrderUI = Omit<Order, "createdAt"> & {
  createdAt: string;
};

export type OrderStatusGroup = {
  orderStatus: OrderStatusEnum;
  paymentStatus: OrderPaymentStatusEnum;
};
