"use client";
import {
  AddressFormDefaultValues,
  AddressFormElements,
} from "@/entities/address";
import { FC, HTMLAttributes } from "react";

interface AddressCreateFormLayoutProps extends HTMLAttributes<HTMLFormElement> {
  handleSubmit: (data: AddressFormDefaultValues) => void;
  toSearch: (q: string) => void;
  isPending: boolean;
  submitText: string;
}

export const AddressCreateFormLayout: FC<AddressCreateFormLayoutProps> = (
  props,
) => {
  const { handleSubmit, isPending, submitText } = props;

  return (
    <AddressFormElements handleSubmit={handleSubmit}>
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
