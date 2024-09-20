// "use client";
import { DELIVERY_TYPE } from "@/kernel/domain/delivery/delivery.type";
import { DeliveryCommonSectionProps } from "../_domain/ui.type";
import { DeliveryCourierSection } from "../_ui/v2/elements/sections/deliveryCourierSection";
import { DeliveryPickupSection } from "../_ui/v2/elements/sections/deliveryPickupSection";
import { DeliveryPostSection } from "../_ui/v2/elements/sections/deliveryPostSection";

type DeliveryTypeKeys = keyof typeof DELIVERY_TYPE;

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

// export type PickupType =
//   (typeof DeliveryTypeFieldList)[typeof DELIVERY_TYPE.PICKUP];
// export type PostType =
//   (typeof DeliveryTypeFieldList)[typeof DELIVERY_TYPE.POST];
// export type CourierType =
//   (typeof DeliveryTypeFieldList)[typeof DELIVERY_TYPE.COURIER];
