import { OrderBase } from "@/entities/order";
import { OrderCreateEmptyDTO } from "@/entities/order";
import { DeliveryBase } from "@/kernel/domain/delivery/delivery.type";

type OrderCreateEmptyPayload = Pick<OrderBase, "userId" | "orderNo">;
type OrderDeliveryDTO = Pick<
  DeliveryBase,
  | "deliveryType"
  | "settlement"
  | "pickupPoint"
  | "postOffice"
  | "street"
  | "house"
  | "apartment"
>;

export type OrderCreateEmptyTxPayload = {
  orderData: OrderCreateEmptyPayload;
};

export type OrderEmptyCreateTxDTO = {
  orderData: OrderCreateEmptyDTO["data"];
  deliveryData: OrderDeliveryDTO;
};
