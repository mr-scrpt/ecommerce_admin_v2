import { OrderPaymentStatusEnum, OrderStatusEnum } from "@/entities/order";

export type OrderUpdateStatusComplexible = {
  orderId: string;
  orderStatus: OrderStatusEnum;
  paymentStatus: OrderPaymentStatusEnum;
};
