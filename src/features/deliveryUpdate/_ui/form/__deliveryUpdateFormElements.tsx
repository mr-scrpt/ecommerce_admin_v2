import {
  DeliveryFormDefaultValues,
  DeliveryFormElements,
  DeliveryFormElementsFields,
  DeliveryFormElementsProps,
} from "@/entities/delivery";
import { StoreSelectElement } from "@/entities/store/_ui/form/elements/storeSelectElement";
import { FormField } from "@/shared/ui/form";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

interface IDeliveryUpdateFormElements
  extends FC<DeliveryFormElementsProps>,
    Omit<DeliveryFormElementsFields, "FieldDeliveryType" | "FieldPickupPoint"> {
  FieldDeliveryType: FC<{ customText: string }>;
  FieldStoreSelect: FC<{ settlementRef: string; onSelectStore: () => void }>;
}
const DeliveryUpdateFormElements: IDeliveryUpdateFormElements = (props) => {
  props.delivery;
  return (
    <DeliveryFormElements {...props}>{props.children}</DeliveryFormElements>
  );
};

DeliveryUpdateFormElements.FieldStreet = DeliveryFormElements.FieldStreet;
DeliveryUpdateFormElements.FieldHouse = DeliveryFormElements.FieldHouse;
DeliveryUpdateFormElements.FieldApartment = DeliveryFormElements.FieldApartment;
DeliveryUpdateFormElements.SubmitButton = DeliveryFormElements.SubmitButton;

DeliveryUpdateFormElements.FieldDeliveryType = function FieldDeliveryType(
  props,
) {
  const { customText } = props;
  return <div>Delivery Type {customText}</div>;
};

DeliveryUpdateFormElements.FieldPostOffice = function FieldPostOffice(props) {
  return <div>Post Office</div>;
};

DeliveryUpdateFormElements.FieldStoreSelect = function FieldStoreSelect(props) {
  const { settlementRef, onSelectStore } = props;
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="store"
      render={({ field }) => (
        <StoreSelectElement
          onSelectStore={field.onChange}
          settlementRef={settlementRef}
          storeInit={field.value}
        />
      )}
    />
  );
};

export default DeliveryUpdateFormElements;
