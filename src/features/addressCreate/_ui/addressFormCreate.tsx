"use client";
import { AddressFormElements } from "@/entities/address";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import {
  AddressCreateFormValues,
  addressCreateDefaultFieldsValues,
  addressCreateFormSchema,
} from "../_domain/form.schema";
import { useAddressCreateHandler } from "../_vm/useAddressCreate.handler";

interface AddressFormCreateProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  settlementRef: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const AddressFormCreate: FC<AddressFormCreateProps> = (props) => {
  const { userId, settlementRef, callbackUrl, className, onSuccess } = props;

  const { handleAddressCreate, isPendingCreate } = useAddressCreateHandler({
    data: { userId, settlementRef },
    onSuccess,
    callbackUrl,
  });

  if (isPendingCreate) {
    return <Spinner aria-label="Loading profile..." />;
  }

  return (
    <div className={cn(className, "w-full")}>
      <AddressFormElements<AddressCreateFormValues>
        handleSubmit={handleAddressCreate}
        schema={addressCreateFormSchema}
        defaultValues={addressCreateDefaultFieldsValues}
      >
        <AddressFormElements.FieldStreet />
        <AddressFormElements.FieldHouse />
        <AddressFormElements.FieldApartment />
        <AddressFormElements.SubmitButton
          isPending={isPendingCreate}
          submitText={"Create Address"}
        />
      </AddressFormElements>
    </div>
  );
};
