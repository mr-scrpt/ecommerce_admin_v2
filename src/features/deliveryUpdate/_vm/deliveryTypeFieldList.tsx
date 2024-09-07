// "use client";
import { StoreToSelect } from "@/entities/store";
// import { DeliveryTypeEnum } from "../_domain/delivery.types";
// import { PostOfficeToSelect } from "../_domain/postOffice.type";
import { DELIVERY_TYPE } from "@/kernel/domain/delivery/delivery.type";
import { ReactNode } from "react";
import { DeliveryUpdateFormElements } from "../_ui/form/elements/deliveryUpdateFormElements";
import { PostFormElements } from "@/entities/post/_ui/form/postFormElements";

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
    formElement: Array<(...args: any[]) => JSX.Element>;
  };
};

// Объект selectDeliveryType с типизацией на основе DeliveryTypeEnum
// export const DeliveryTypeFieldList: SelectDeliveryType = {
//   [DELIVERY_TYPE.PICKUP]: {
//     value: "Pickup",
//     type: DELIVERY_TYPE.PICKUP,
//     formElement: [
//       () => {
//         return <DeliveryUpdateFormElements.FieldStoreSelect key="store" />;
//       },
//     ],
//   },
//   [DELIVERY_TYPE.POST]: {
//     value: "Post",
//     type: DELIVERY_TYPE.POST,
//     formElement: [
//       () => <DeliveryUpdateFormElements.FieldPostSelect key="post" />,
//     ],
//   },
//   [DELIVERY_TYPE.COURIER]: {
//     value: "Courier",
//     type: DELIVERY_TYPE.COURIER,
//     formElement: [
//       () => <DeliveryUpdateFormElements.FieldAddress key="address" />,
//     ],
//   },
// };

export const DeliveryTypeFieldList: SelectDeliveryType = {
  [DELIVERY_TYPE.PICKUP]: {
    value: "Pickup",
    type: DELIVERY_TYPE.PICKUP,
    formElement: [
      (props: any) => {
        return <DeliveryUpdateFormElements.FieldStoreSelect key="store" />;
      },
    ],
  },
  [DELIVERY_TYPE.POST]: {
    value: "Post",
    type: DELIVERY_TYPE.POST,
    formElement: [
      (props: any) => (
        <PostFormElements.FieldPostSelect
          key="post"
          settlementRef={props.settlementRef}
        />
      ),
    ],
  },
  [DELIVERY_TYPE.COURIER]: {
    value: "Courier",
    type: DELIVERY_TYPE.COURIER,
    formElement: [
      (props: any) => <DeliveryUpdateFormElements.FieldAddress key="address" />,
    ],
  },
};

export type PickupType =
  (typeof DeliveryTypeFieldList)[typeof DELIVERY_TYPE.PICKUP];
export type PostType =
  (typeof DeliveryTypeFieldList)[typeof DELIVERY_TYPE.POST];
export type CourierType =
  (typeof DeliveryTypeFieldList)[typeof DELIVERY_TYPE.COURIER];
