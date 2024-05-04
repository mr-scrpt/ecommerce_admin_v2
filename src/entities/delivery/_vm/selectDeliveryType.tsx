// "use client";
import { StoreToSelect } from "@/entities/store";
import { DeliveryTypeEnum } from "../_domain/delivery.types";
import { PostOfficeToSelect } from "../_domain/postOffice.type";
import { DeliveryFormElements } from "../_ui/deliveryFormElements";

// enum DeliveryTypeEnum {
//   PICKUP = 'PICKUP',
//   POST = 'POST',
//   COURIER = 'COURIER',
// }
// export const selectDeliveryType = [
//   {
//     type: DeliveryTypeEnum.PICKUP,
//     value: "Pickup",
//     formElement: [
//       () => <DeliveryFormElements.FieldPickupPoint key="pickupPoint" />,
//     ],
//   },
//   {
//     type: DeliveryTypeEnum.POST,
//     value: "Post",
//     formElement: [
//       ({
//         postOfficeListToSelect,
//         isPendingPostOfficeList,
//       }: {
//         postOfficeListToSelect: PostOfficeToSelect[];
//         isPendingPostOfficeList: boolean;
//       }) => (
//         <DeliveryFormElements.FieldPostOffice
//           key="postOffice"
//           postOfficeListToSelect={postOfficeListToSelect}
//           isPendingPostOfficeList={isPendingPostOfficeList}
//         />
//       ),
//     ],
//   },
//   {
//     type: DeliveryTypeEnum.COURIER,
//     value: "Courier",
//     formElement: [
//       () => <DeliveryFormElements.FieldStreet key="street" />,
//       () => <DeliveryFormElements.FieldHouse key="house" />,
//       () => <DeliveryFormElements.FieldApartment key="apartment" />,
//     ],
//   },
// ];

// Типы для значений объекта DeliveryTypeEnum
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
export const selectDeliveryType: SelectDeliveryType = {
  [DeliveryTypeEnum.PICKUP]: {
    value: "Pickup",
    type: DeliveryTypeEnum.PICKUP,
    formElement: [
      ({ storeListToSelect }: { storeListToSelect: StoreToSelect[] }) => (
        <DeliveryFormElements.FieldPickupPoint
          key="pickupPoint"
          storeListToSelect={storeListToSelect}
        />
      ),
    ],
  },
  [DeliveryTypeEnum.POST]: {
    value: "Post",
    type: DeliveryTypeEnum.POST,
    formElement: [
      ({
        postOfficeListToSelect,
      }: {
        postOfficeListToSelect: PostOfficeToSelect[];
        isPendingPostOfficeList: boolean;
      }) => (
        <DeliveryFormElements.FieldPostOffice
          key="postOffice"
          postOfficeListToSelect={postOfficeListToSelect}
        />
      ),
    ],
  },
  [DeliveryTypeEnum.COURIER]: {
    value: "Courier",
    type: DeliveryTypeEnum.COURIER,
    formElement: [
      () => <DeliveryFormElements.FieldStreet key="street" />,
      () => <DeliveryFormElements.FieldHouse key="house" />,
      () => <DeliveryFormElements.FieldApartment key="apartment" />,
    ],
  },
};

// Теперь вы можете получить типы для каждого ключа
export type PickupType =
  (typeof selectDeliveryType)[typeof DeliveryTypeEnum.PICKUP];
export type PostType =
  (typeof selectDeliveryType)[typeof DeliveryTypeEnum.POST];
export type CourierType =
  (typeof selectDeliveryType)[typeof DeliveryTypeEnum.COURIER];
