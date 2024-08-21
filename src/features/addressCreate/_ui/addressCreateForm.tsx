"use client";
import { AddressFormElements } from "@/entities/address";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useAddressCreateMutation } from "../_mutation/useAddressCreate.mutation";
import {
  AddressCreateFormValues,
  addressCreateFormSchema,
} from "../_domain/form.schema";

interface AddressCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  settlementRef: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const AddressCreateForm: FC<AddressCreateFormProps> = (props) => {
  const { userId, settlementRef, callbackUrl, className, onSuccess } = props;

  const router = useRouter();

  const { addressCreate, isPending: isPendingCreate } =
    useAddressCreateMutation();

  if (isPendingCreate) {
    return <Spinner aria-label="Loading profile..." />;
  }

  const handleSubmit = async (data: AddressCreateFormValues) => {
    await addressCreate({
      addressData: {
        ...data,
        userId,
        settlementRef,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <AddressFormElements<AddressCreateFormValues>
        handleSubmit={handleSubmit}
        schema={addressCreateFormSchema}
      >
        <AddressFormElements.FieldStreet />
        <AddressFormElements.FieldHouse />
        <AddressFormElements.FieldApartment />
        {/* <AddressFormElements.FieldAddressSelect */}
        {/*   userId={userId} */}
        {/*   settlementRef={settlementRef} */}
        {/* /> */}
        {/* <AddressFormElements.FieldAddressMultiSelect */}
        {/*   userId={userId} */}
        {/*   settlementRef={settlementRef} */}
        {/* /> */}
        <AddressFormElements.SubmitButton
          isPending={isPendingCreate}
          submitText={"Create Address"}
        />
      </AddressFormElements>
    </div>
  );
};
