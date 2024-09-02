import { DELIVERY_TYPE } from "./delivery.type";

export const DELIVERY_TYPE_LIST = [
  { type: DELIVERY_TYPE.POST, value: "Post" },
  { type: DELIVERY_TYPE.PICKUP, value: "Pickup" },
  { type: DELIVERY_TYPE.COURIER, value: "Courier" },
];

const [DeliveryTypeDefaultElement] = DELIVERY_TYPE_LIST;

export const DeliveryTypeDefaultOption = {
  label: DeliveryTypeDefaultElement.value,
  value: DeliveryTypeDefaultElement.type,
};
