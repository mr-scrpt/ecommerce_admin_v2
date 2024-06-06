import { DeliveryTypeEnum } from "@/kernel/domain/delivery.type";

// NOTE: Base
export type DeliveryBase = {
  orderId: string;
  deliveryType: DeliveryTypeEnum;
  settlement: string;
  street: string | null;
  house: string | null;
  apartment: string | null;
  postOffice: string | null;
  pickupPoint: string | null;
};

// NOTE: Entity
export type DeliveryEntity = DeliveryBase & {
  id: string;
  createdAt: Date;
};

// NOTE: Projetions
export type Delivery = DeliveryBase & {
  id: string;
};

// NOTE: Selector
export type DeliveryGetSelector = {
  id: string;
};

export type DeliveryGetOrderSelector = {
  orderId: string;
};
