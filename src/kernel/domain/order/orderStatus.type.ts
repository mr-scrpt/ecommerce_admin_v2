import { ORDER_STATUS_PAYMENT, ORDER_STATUS_STATE } from "@prisma/client";

export { ORDER_STATUS_PAYMENT, ORDER_STATUS_STATE };

// NOTE: Base Order Status State
export type OrderStatusStateBase = {
  status: ORDER_STATUS_STATE;
};

export type OrderStatusPaymentBase = {
  status: ORDER_STATUS_PAYMENT;
};

// NOTE: Entity
export type OrderStatusStateEntity = OrderStatusStateBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderStatusPaymentEntity = OrderStatusPaymentBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type OrderStatusState = OrderStatusStateBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderStatusPayment = OrderStatusPaymentBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderStatus = {
  orderStatusState: OrderStatusState;
  orderStatusPayment: OrderStatusPayment;
};
export type OrderStatusList = {
  orderStatusStateList: Array<OrderStatusState>;
  orderStatusPaymentList: Array<OrderStatusPayment>;
};
