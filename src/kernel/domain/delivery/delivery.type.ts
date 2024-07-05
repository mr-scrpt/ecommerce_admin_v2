import { DELIVERY_TYPE as DeliveryTypeEnum } from "@prisma/client";
import { Settlement } from "../settlement/settlement.type";
export { DeliveryTypeEnum };

// NOTE: Base
export type DeliveryBase = {
  orderId: string;
  deliveryType: DeliveryTypeEnum;
  // settlement: string;
  settlementRef: string;
  street: string | null;
  house: string | null;
  apartment: string | null;
  postOffice: string | null;
  store: string | null;
};

// NOTE: Entity
export type DeliveryEntity = DeliveryBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type Delivery = DeliveryBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
