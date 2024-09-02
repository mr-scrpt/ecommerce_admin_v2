import { OrderUpdateDTO } from "@/kernel/domain/order/order.dto";
import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order/order.type";
import { OrderRowBase } from "@/kernel/domain/order/orderRow.type";

// NOTE: Order Update
type OrderStatusUpdatePayload = OrderStatusEnum;
type OrderPaymentStatusUpdatePayload = OrderPaymentStatusEnum;

export type OrderUpdateTxPayload = {
  selector: OrderUpdateSelector;
  orderStatusData: OrderStatusUpdatePayload;
  orderPaymentStatusData: OrderPaymentStatusUpdatePayload;
};

export type OrderUpdateTxDTO = {
  selector: OrderUpdateSelector;
  orderStatusData: OrderUpdateDTO["data"]["orderStatus"];
  orderPaymentStatusData: OrderUpdateDTO["data"]["paymentStatus"];
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
