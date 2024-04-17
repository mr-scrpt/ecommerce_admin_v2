import { DELIVERY_TYPE as DeliveryTypeEnum } from "@prisma/client";

export const baseQueryKey = "delivery";

export { DeliveryTypeEnum };

type DeliveryBase = {
  orderId: string;
  deliveryType: DeliveryTypeEnum;
  // area: string;
  // araeCode: string;

  city: string;
  // cityCode: string;

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

  city: string;

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

// NOTE: UI
export type SettleToSelect = {
  value: string;
  area: string;
  label: string;
};

// NOTE: Side
// export type DeliveryProduct = DeliveryRow & {
//   priceDelivery: number;
//   quantity: number;
// };

// NOTE: UI
// export type DeliveryUI = Omit<Delivery, "createdAt"> & {
//   createdAt: string;
// };
