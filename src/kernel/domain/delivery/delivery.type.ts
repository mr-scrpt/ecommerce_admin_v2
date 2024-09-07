import { DELIVERY_TYPE } from "@prisma/client";
export { DELIVERY_TYPE };

// NOTE: Base
export type DeliveryBase = {
  orderId: string;
  userId: string;
  receiverId: string;
  deliveryTypeId: string;
  // deliveryType: DELIVERY_TYPE;
  settlementRef: string | null;

  postOfficeId: string | null;
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
