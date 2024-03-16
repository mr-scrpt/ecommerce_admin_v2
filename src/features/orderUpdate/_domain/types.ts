import { OrderId, OrderToUpdate } from "@/entities/order";

export type OrderUpdateComplexible = {
  orderId: OrderId;
  orderData: Partial<OrderToUpdate>;
};
