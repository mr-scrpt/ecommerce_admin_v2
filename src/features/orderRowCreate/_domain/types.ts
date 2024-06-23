import { Order, OrderRowBase } from "@/entities/order/";
import { ProductToSelect } from "@/entities/product";

// export type OrderRowAddComplexible = OrderRowToAddPayload;

// export type OrderProductGroup = {
//   available: Array<ProductToSelect>;
//   inOrder: Array<ProductToSelect>;
//   outOfStock: Array<ProductToSelect>;
// };

// export type OrderProductCreate = {
//   productId: string;
//   quantity: number;
// };
//
type OrderRowPayload = Pick<OrderRowBase, "productId" | "quantity">;
type OrderRowDTO = Pick<OrderRowBase, "productId" | "quantity">;

export type OrderRowCreateTxPayload = {
  target: OrderRowCreateTarget;
  orderRowData: OrderRowPayload;
};

export type OrderRowCreateTxDTO = {
  target: OrderRowCreateTarget;
  orderRowData: OrderRowDTO;
};

// NOTE: Target
export type OrderRowCreateTarget = {
  orderId: Order["id"];
};
