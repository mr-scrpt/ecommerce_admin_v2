// "use client";
import { DeliveryTypeEnum } from "../_domain/delivery.types";
import { PostOfficeToSelect } from "../_domain/postOffice.type";
import { DeliveryFormElements } from "../_ui/deliveryFormElements";

export const selectDeliveryType = [
  {
    type: DeliveryTypeEnum.PICKUP,
    value: "Pickup",
    formElement: [
      () => <DeliveryFormElements.FieldPickupPoint key="pickupPoint" />,
    ],
  },
  {
    type: DeliveryTypeEnum.POST,
    value: "Post",
    formElement: [
      (postOfficeListToSelect: PostOfficeToSelect[]) => (
        <DeliveryFormElements.FieldPostOffice
          key="postOffice"
          postOfficeListToSelect={postOfficeListToSelect}
        />
      ),
    ],
  },
  {
    type: DeliveryTypeEnum.COURIER,
    value: "Courier",
    formElement: [
      () => <DeliveryFormElements.FieldStreet key="street" />,
      () => <DeliveryFormElements.FieldHouse key="house" />,
      () => <DeliveryFormElements.FieldApartment key="apartment" />,
    ],
  },
];
