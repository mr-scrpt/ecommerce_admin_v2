import { OrderRow } from "@/kernel/domain/order/orderRow.type";

// NOTE: Side
export type OrderProduct = OrderRow & {
  priceOrder: number;
  quantity: number;
};
