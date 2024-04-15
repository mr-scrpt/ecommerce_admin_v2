import { DeliveryTypeEnum } from "../_domain/delivery.types";

export const selectDeliveryType = [
  { type: DeliveryTypeEnum.PICKUP, value: "Pickup" },
  { type: DeliveryTypeEnum.POST, value: "Post" },
  { type: DeliveryTypeEnum.COURIER, value: "Courier" },
];
