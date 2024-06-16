import { OrderBase } from "@/entities/order";
import { OrderCreateEmptyDTO } from "@/entities/order";

type OrderCreateEmptyPayload = Pick<OrderBase, "userId" | "orderNo">;

export type OrderCreateEmptyTxPayload = {
  orderData: OrderCreateEmptyPayload;
};

export type OrderEmptyCreateTxDTO = {
  orderData: OrderCreateEmptyDTO["data"];
};
