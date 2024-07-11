// import { OrderBase } from "@/entities/order";
// import { OrderCreateEmptyDTO } from "@/entities/order";
import { DeliveryBase } from "@/kernel/domain/delivery/delivery.type";
import { OrderCreateEmptyDTO } from "@/kernel/domain/order/order.dto";
import { OrderBase } from "@/kernel/domain/order/order.type";

type OrderCreateEmptyPayload = Pick<OrderBase, "userId">;

type OrderDeliveryDTO = Pick<
  DeliveryBase,
  | "userId"
  | "deliveryType"
  | "settlementRef"
  | "storeId"
  | "postOffice"
  | "addressId"
>;

export type OrderCreateEmptyTxPayload = {
  orderData: OrderCreateEmptyPayload;
};

export type OrderEmptyCreateTxDTO = {
  orderData: OrderCreateEmptyDTO["data"];
  deliveryData: OrderDeliveryDTO;
};
