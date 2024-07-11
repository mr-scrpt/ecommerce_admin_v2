// "use client";
import { StoreToSelect } from "@/entities/store";
// import { DeliveryTypeEnum } from "../_domain/delivery.types";
// import { PostOfficeToSelect } from "../_domain/postOffice.type";
import { DeliveryTypeEnum } from "@/kernel/domain/delivery/delivery.type";
import { ReactNode } from "react";
import { DeliveryUpdateFormElements } from "../_ui/form/elements/deliveryUpdateFormElements";

// TODO: Move this type <<<<
// TODO: Move this component
export type PostOfficeToSelect = {
  value: string;
  type: string;
  label: string;
};
type DeliveryTypeKeys = keyof typeof DeliveryTypeEnum;

// Тип для объекта selectDeliveryType, где ключи - это значения из DeliveryTypeEnum
type SelectDeliveryType = {
  [key in DeliveryTypeKeys]: {
    value: string;
    type: DeliveryTypeEnum;
    formElement: Array<(...args: any[]) => JSX.Element>;
  };
};

// Объект selectDeliveryType с типизацией на основе DeliveryTypeEnum
export const DeliveryTypeFieldList: SelectDeliveryType = {
  [DeliveryTypeEnum.PICKUP]: {
    value: "Pickup",
    type: DeliveryTypeEnum.PICKUP,
    formElement: [
      () => {
        return <DeliveryUpdateFormElements.FieldStoreSelect key="store" />;
      },
    ],
  },
  [DeliveryTypeEnum.POST]: {
    value: "Post",
    type: DeliveryTypeEnum.POST,
    formElement: [
      () => <DeliveryUpdateFormElements.FieldPostSelect key="post" />,
    ],
  },
  [DeliveryTypeEnum.COURIER]: {
    value: "Courier",
    type: DeliveryTypeEnum.COURIER,
    formElement: [
      () => <DeliveryUpdateFormElements.FieldAddress key="address" />,
      // () => <DeliveryUpdateFormElements.FieldStreet key="street" />,
      // () => <DeliveryUpdateFormElements.FieldHouse key="house" />,
      // () => <DeliveryUpdateFormElements.FieldApartment key="apartment" />,
    ],
  },
};

export type PickupType =
  (typeof DeliveryTypeFieldList)[typeof DeliveryTypeEnum.PICKUP];
export type PostType =
  (typeof DeliveryTypeFieldList)[typeof DeliveryTypeEnum.POST];
export type CourierType =
  (typeof DeliveryTypeFieldList)[typeof DeliveryTypeEnum.COURIER];
