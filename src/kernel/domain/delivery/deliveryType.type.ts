import { DELIVERY_TYPE } from "@prisma/client";

// NOTE: Base
export type DeliveryTypeBase = {
  type: DELIVERY_TYPE;
};

// NOTE: Entity
export type DeliveryTypeEntity = DeliveryTypeBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type DeliveryType = DeliveryTypeBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
