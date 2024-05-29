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

// NOTE: Payload
export type DeliveryGetPayload = {
  deliveryId: string;
};
// export type DeliveryToCreate = Delivery;
// export type DeliveryToUpdate = Delivery & {
//   id: string;
// };

// NOTE: Side
// export type DeliveryProduct = DeliveryRow & {
//   priceDelivery: number;
//   quantity: number;
// };
