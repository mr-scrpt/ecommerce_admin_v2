import { OrderRow } from "@/kernel/domain/order/orderRow.type";

export const orderRowToProductListId = (
  orderRow: Array<OrderRow>,
): Array<string> => {
  return orderRow.map((item) => item.productId);
};
