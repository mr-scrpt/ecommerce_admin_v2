import { DeliveryToUpdate } from "@/entities/delivery";

export type OrderDeliveryUpdateComplexible = {
  deliveryId: string;
  deliveryData: DeliveryToUpdate;
};
