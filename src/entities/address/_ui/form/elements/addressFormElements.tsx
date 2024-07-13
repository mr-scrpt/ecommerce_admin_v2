"use client";
import { Address } from "@/kernel/domain/address/address.type";
import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  AddressFormDefaultValues,
  addressFormDefaultSchema,
} from "../../../_domain/form.schema";
import { AddressApartmentElement } from "./addressApartmentElement";
import { AddressHouseElement } from "./addressHouseElement";
import { AddressStreetElement } from "./addressStreetElement";
import { AddressSelectElement } from "./addressSelectElement";

interface AddressFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  addressData?: Address;
  handleSubmit: (data: AddressFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

type AddressFormElementsType = FC<AddressFormElementsProps> & {
  // TODO: Select settlement entities
  FieldStreet: FC;
  FieldHouse: FC;
  FieldApartment: FC;
  FieldAddressSelect: FC;
  SubmitButton: FC<{
    isPending: boolean;
    submitText: string;
    className?: string;
  }>;
};

const getDefaultValues = (addressData?: Address) => ({
  settlementRef: addressData?.settlementRef ?? "",
  street: addressData?.street ?? "",
  house: addressData?.house ?? "",
  apartment: addressData?.apartment ?? "",
  addressId: addressData?.id ?? "",
  userId: addressData?.userId ?? "",
});

export const AddressFormElements: AddressFormElementsType = (props) => {
  const { addressData, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<AddressFormDefaultValues>({
    resolver: zodResolver(schema ?? addressFormDefaultSchema),
    defaultValues: getDefaultValues(addressData),
  });

  useEffect(() => {
    form.reset(getDefaultValues(addressData));
  }, [addressData, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {children}
      </form>
    </FormProvider>
  );
};

AddressFormElements.FieldStreet = function FieldSettlement() {
  const { control } = useFormContext<AddressFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="street"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Address list</FormLabel>
          <AddressStreetElement onChange={field.onChange} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

AddressFormElements.FieldHouse = function FieldHouse() {
  const { control } = useFormContext<AddressFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="house"
      render={({ field }) => (
        <FormItem>
          <FormLabel>House</FormLabel>
          <AddressHouseElement onChange={field.onChange} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

AddressFormElements.FieldApartment = function FieldApartment() {
  const { control } = useFormContext<AddressFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="apartment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Apartment</FormLabel>
          <AddressApartmentElement onChange={field.onChange} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

AddressFormElements.FieldAddressSelect = function FieldAddressSelect() {
  const { control, getValues } = useFormContext<AddressFormDefaultValues>();

  const { userId, settlementRef } = getValues();

  return (
    <FormField
      control={control}
      name="addressId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Apartment list</FormLabel>
          <AddressSelectElement
            onSelectAddress={field.onChange}
            userId={userId}
            settlementRef={settlementRef}
            addressInit={field.value}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

AddressFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}) {
  return (
    <Button type="submit" disabled={isPending} className={cn(className)}>
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Address updating..."
        />
      )}
      {submitText}
    </Button>
  );
};
