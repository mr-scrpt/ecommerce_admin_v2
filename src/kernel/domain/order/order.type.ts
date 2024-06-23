import {
  type Order as OrderDBType,
  ORDER_PAYMENT_STATUS as OrderPaymentStatusEnum,
  ORDER_STATUS as OrderStatusEnum,
} from "@prisma/client";
import { OrderRow, OrderRowEntity } from "./orderRow.type";

export { OrderDBType, OrderPaymentStatusEnum, OrderStatusEnum };

// NOTE: Base
export type OrderBase = {
  orderNo: string;
  userId: string;
  orderStatus: OrderStatusEnum;
  paymentStatus: OrderPaymentStatusEnum;
  priceTotal: number;
};

// NOTE: Entity
export type OrderEntity = OrderBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderCompositeEntity = OrderEntity & {
  orderRowList: Array<OrderRowEntity>;
};

// NOTE: Projetions
export type Order = OrderBase & {
  id: string;
  orderNo: string;
  userId: string;
  createdAt: Date;
  priceTotal: number;
};

export type OrderComposite = Order & {
  orderRowList: Array<OrderRow>;
};
