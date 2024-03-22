import {
  ORDER_PAYMENT_STATUS as OrderPaymentStatusEnum,
  ORDER_STATUS as OrderStatusEnum,
} from "@prisma/client";
export const baseQueryKey = "order";
export type OrderId = string;
export type OrderSlug = string;
export { OrderPaymentStatusEnum, OrderStatusEnum };

type OrderRowBase = {
  orderId: string;

  productId: string;
  productName: string;
  productArticle: string;
  productImg: string;

  quantity: number;
  price: number;
};

export type OrderRowEntity = OrderRowBase & {
  id: string;
  createdAt: Date;
};

// NOTE: Projetions
type OrderRowBaseProjection = {
  orderId: string;

  productId: string;
  productName: string;
  productArticle: string;
  productImg: string;

  quantity: number;
  price: number;
};

export type OrderRow = OrderRowBaseProjection & {
  id: string;
  createdAt: Date;
};

// NOTE: Actions
export type OrderRowToAddPayload = {
  orderId: string;
  productId: string;
  quantity: number;
};

export type OrderRowChangeQuantity = {
  id: string;
  quantity: number;
};

// NOTE: DB
export type OrderRowToAdd = OrderRowBaseProjection & {};

// NOTE: Side
export type OrderProduct = OrderRow & {
  priceOrder: number;
  quantity: number;
};
