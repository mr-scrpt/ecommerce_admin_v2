// "use client";
import { DELIVERY_TYPE } from "@/kernel/domain/delivery/delivery.type";
import { StoreFormElements } from "@/entities/store";
import { AddressFormElements } from "@/entities/address";
import { DeliveryPostSection } from "../_ui/v2/elements/sections/deliveryPostSection";
import { DeliveryCommonSectionProps } from "../_domain/ui.type";
import { DeliveryPickupSection } from "../_ui/v2/elements/sections/deliveryPickupSection";
import { DeliveryCourierSection } from "../_ui/v2/elements/sections/deliveryCourierSection";

// TODO: Move this type <<<<
// TODO: Move this component
export type PostOfficeToSelect = {
  value: string;
  type: string;
  label: string;
};
type DeliveryTypeKeys = keyof typeof DELIVERY_TYPE;

// Тип для объекта selectDeliveryType, где ключи - это значения из DeliveryTypeEnum
type SelectDeliveryType = {
  [key in DeliveryTypeKeys]: {
    value: string;
    type: DELIVERY_TYPE;
    formElement: Array<(props: DeliveryCommonSectionProps) => JSX.Element>;
  };
};

export const DeliveryTypeFieldList: SelectDeliveryType = {
  [DELIVERY_TYPE.PICKUP]: {
    value: DELIVERY_TYPE.PICKUP,
    type: DELIVERY_TYPE.PICKUP,
    formElement: [
      (props: DeliveryCommonSectionProps) => {
        return <DeliveryPickupSection {...props} key={DELIVERY_TYPE.PICKUP} />;
      },
    ],
  },
  [DELIVERY_TYPE.POST]: {
    value: DELIVERY_TYPE.POST,
    type: DELIVERY_TYPE.POST,
    formElement: [
      (props: DeliveryCommonSectionProps) => (
        <DeliveryPostSection {...props} key={DELIVERY_TYPE.POST} />
      ),
    ],
  },
  [DELIVERY_TYPE.COURIER]: {
    value: DELIVERY_TYPE.COURIER,
    type: DELIVERY_TYPE.COURIER,
    formElement: [
      (props: DeliveryCommonSectionProps) => (
        <DeliveryCourierSection {...props} key={DELIVERY_TYPE.COURIER} />
      ),
    ],
  },
};

export type PickupType =
  (typeof DeliveryTypeFieldList)[typeof DELIVERY_TYPE.PICKUP];
export type PostType =
  (typeof DeliveryTypeFieldList)[typeof DELIVERY_TYPE.POST];
export type CourierType =
  (typeof DeliveryTypeFieldList)[typeof DELIVERY_TYPE.COURIER];
