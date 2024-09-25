import { Order } from "@/kernel/domain/order/order.type";
import { OrderRowBase } from "@/kernel/domain/order/orderRow.type";

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
