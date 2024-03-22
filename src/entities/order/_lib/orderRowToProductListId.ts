import { OrderRow } from "../_domain/orderRow.types";

export const orderRowToProductListId = (
  orderRow: Array<OrderRow>,
): Array<string> => {
  return orderRow.map((item) => item.productId);
};
