import { OrderUpdateDTO } from "@/kernel/domain/order/order.dto";
import { OrderRowBase } from "@/kernel/domain/order/orderRow.type";
import {
  ORDER_STATUS_PAYMENT,
  ORDER_STATUS_STATE,
} from "@/kernel/domain/order/orderStatus.type";

// NOTE: Order Update
type OrderStatusStateUpdatePayload = { id: string };
type OrderStatusPaymentUpdatePayload = { id: string };

export type OrderUpdateTxPayload = {
  selector: OrderUpdateSelector;
  orderStatusStateData: OrderStatusStateUpdatePayload;
  orderStatusPaymentData: OrderStatusPaymentUpdatePayload;
};

export type OrderUpdateTxDTO = {
  selector: OrderUpdateSelector;
  orderStatusStateData: OrderStatusStateUpdatePayload;
  orderStatusPaymentData: OrderStatusPaymentUpdatePayload;
};

// NOTE: Selector
export type OrderUpdateSelector = {
  id: string;
};

// NOTE: Order Row Create
type OrderRowPayload = Pick<OrderRowBase, "productId" | "quantity">;
type OrderRowDTO = Pick<OrderRowBase, "productId" | "quantity">;

export type OrderRowCreateTxPayload = {
  selector: OrderRowCreateSelector;
  orderRowData: OrderRowPayload;
};

export type OrderRowCreateTxDTO = {
  selector: OrderRowCreateSelector;
  orderRowData: OrderRowDTO;
};

// NOTE: Selector
export type OrderRowCreateSelector = {
  orderId: string;
};
