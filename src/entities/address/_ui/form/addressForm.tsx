import { Address } from "@/kernel/domain/address/address.type";
import { FC, HTMLAttributes } from "react";
import { AddressFormElements } from "./elements/addressFormElements";
import { AddressFormDefaultValues } from "../../_domain/form.schema";

interface AddressFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, "handleSubmit"> {
  addressData?: Address;
  handleSubmit: (data: AddressFormDefaultValues) => void;
  isPending: boolean;
  submitText: string;
}

export const AddressForm: FC<AddressFormProps> = (props) => {
  const { addressData, isPending, submitText, handleSubmit } = props;
  return (
    <AddressFormElements handleSubmit={handleSubmit} addressData={addressData}>
      <AddressFormElements.FieldStreet />
      <AddressFormElements.FieldHouse />
      <AddressFormElements.FieldApartment />
      <AddressFormElements.SubmitButton
        isPending={isPending}
        submitText={submitText}
      />
    </AddressFormElements>
  );
};
