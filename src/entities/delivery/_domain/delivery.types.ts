import { DELIVERY_TYPE as DeliveryTypeEnum } from "@prisma/client";

export const baseQueryKey = "delivery";

export { DeliveryTypeEnum };

type DeliveryBase = {
  orderId: string;
  deliveryType: DeliveryTypeEnum;
  // area: string;
  // araeCode: string;

  settlement: string;
  // settlementCode: string;

  street: string | null;
  house: string | null;
  apartment: string | null;
  postOffice: string | null;
  pickupPoint: string | null;
};

export type DeliveryEntity = DeliveryBase & {
  id: string;
  createdAt: Date;
};

// NOTE: Projetions

export type Delivery = {
  id: string;
  orderId: string;
  deliveryType: DeliveryTypeEnum;

  settlement: string;

  street: string | null;
  house: string | null;
  apartment: string | null;
  postOffice: string | null;
  pickupPoint: string | null;
};

// NOTE: Actions
export type DeliveryToCreate = Delivery;
export type DeliveryToUpdate = Delivery & {
  id: string;
};

// NOTE: Side
// export type DeliveryProduct = DeliveryRow & {
//   priceDelivery: number;
//   quantity: number;
// };
