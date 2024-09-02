import { ProductToSelect } from "@/entities/product";
import { Order } from "@/kernel/domain/order/order.type";
import { OrderRowBase } from "@/kernel/domain/order/orderRow.type";

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
  selector: OrderRowCreateTarget;
  orderRowData: OrderRowPayload;
};

export type OrderRowCreateTxDTO = {
  selector: OrderRowCreateTarget;
  orderRowData: OrderRowDTO;
};

// NOTE: Target
export type OrderRowCreateTarget = {
  orderId: Order["id"];
};
