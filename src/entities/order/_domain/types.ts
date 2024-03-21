import {
  Order as OrderDBType,
  ORDER_PAYMENT_STATUS as OrderPaymentStatusEnum,
  ORDER_STATUS as OrderStatusEnum,
} from "@prisma/client";
export const baseQueryKey = "order";
export type OrderId = string;
export type OrderSlug = string;
export { OrderStatusEnum, OrderPaymentStatusEnum };

export const orderToEnumMap = (order: OrderDBType): Order => ({
  ...order,
  orderStatus: order.orderStatus as OrderStatusEnum,
  paymentStatus: order.paymentStatus as OrderPaymentStatusEnum,
});

export type OrderEntity = {
  id: OrderId;
  userId: string;
  orderStatus: OrderStatusEnum;
  paymentStatus: OrderPaymentStatusEnum;
  // orderStatus: string;
  // paymentStatus: string;
  createdAt: Date;
};

export type OrderRowEntity = {
  id: string;
  orderId: string;

  productId: string;
  productName: string;
  productArticle: string;
  productImg: string;

  quantity: number;
  price: number;
  createdAt: Date;
};

export type OrderRelationEntity = OrderEntity & {
  orderRowList: Array<OrderRowEntity>;
};

// Projetions

export type Order = {
  id: OrderId;
  userId: string;
  orderStatus: OrderStatusEnum;
  paymentStatus: OrderPaymentStatusEnum;
  createdAt: Date;
};

export type OrderRow = {
  id: string;
  orderId: string;

  productId: string;
  productName: string;
  productArticle: string;
  productImg: string;

  quantity: number;
  price: number;
  createdAt: Date;
};

export type OrderRelation = Order & {
  orderRowList: Array<OrderRow>;
};

export type OrderToUpdate = {
  id: OrderId;
  orderStatus: OrderStatusEnum;
  paymentStatus: OrderPaymentStatusEnum;
};

// Side
export type OrderProduct = OrderRow & {
  priceOrder: number;
  quantity: number;
};
