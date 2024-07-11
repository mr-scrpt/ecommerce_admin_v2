import { DELIVERY_TYPE as DeliveryTypeEnum } from "@prisma/client";
export { DeliveryTypeEnum };

// NOTE: Base
export type DeliveryBase = {
  orderId: string;
  userId: string;
  deliveryType: DeliveryTypeEnum;
  settlementRef: string | null;
  postOffice: string | null;
  storeId: string | null;
  addressId: string | null;
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
