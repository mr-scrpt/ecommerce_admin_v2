import { OrderUpdateDTO } from "@/entities/order/_domain/order.dto";
import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order/order.type";

type OrderStatusUpdatePayload = OrderStatusEnum;
type OrderPaymentStatusUpdatePayload = OrderPaymentStatusEnum;

export type OrderStatusUpdateTxPayload = {
  selector: OrderUpdateSelector;
  orderStatusData: OrderStatusUpdatePayload;
  orderPaymentStatusData: OrderPaymentStatusUpdatePayload;
};

export type OrderStatusUpdateTxDTO = {
  selector: OrderUpdateSelector;
  orderStatusData: OrderUpdateDTO["data"]["orderStatus"];
  orderPaymentStatusData: OrderUpdateDTO["data"]["paymentStatus"];
};

// NOTE: Selector
export type OrderUpdateSelector = {
  id: string;
};
