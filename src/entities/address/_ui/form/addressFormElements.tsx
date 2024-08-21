"use client";
import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import {
  DefaultValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  AddressFormDefaultValues,
  addressFormDefaultSchema,
} from "../../_domain/form.schema";
import { AddressApartmentElement } from "./elements/addressApartmentElement";
import { AddressHouseElement } from "./elements/addressHouseElement";
import { AddressStreetElement } from "./elements/addressStreetElement";
import { AddressSelectElement } from "./elements/addressSelectElement";
import { AddressMultiSelectElement } from "./elements/addressMultiSelectElement";
import { ButtonSubmitComponentType } from "@/shared/type/button";

interface AddressFormElementsProps<T extends AddressFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type AddressFormElementsComponent = <
  T extends AddressFormDefaultValues = AddressFormDefaultValues,
>(
  props: AddressFormElementsProps<T>,
) => React.ReactElement;

type AddressFormFields = {
  FieldStreet: FC;
  FieldHouse: FC;
  FieldApartment: FC;
  FieldAddressSelect: FC<AddressFormSelectProps>;
  FieldAddressMultiSelect: FC<AddressFormSelectProps>;
  SubmitButton: ButtonSubmitComponentType;
};

type AddressFormElementsType = AddressFormElementsComponent & AddressFormFields;

const standartFieldsValues: AddressFormDefaultValues = {
  street: "",
  house: "",
  apartment: "",
  addressList: [],
};

const getDefaultFormValues = <T extends AddressFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...standartFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const AddressFormElements: AddressFormElementsType = <
  T extends AddressFormDefaultValues,
>(
  props: AddressFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? addressFormDefaultSchema),
    defaultValues: { ...getDefaultFormValues<T>(defaultValues) },
  });

  useEffect(() => {
    form.reset(getDefaultFormValues<T>(defaultValues));
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data: T) => {
    onSubmit?.(data);
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
          <AddressStreetElement value={field.value} onChange={field.onChange} />
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
          <AddressHouseElement value={field.value} onChange={field.onChange} />
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
          <AddressApartmentElement
            value={field.value}
            onChange={field.onChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface AddressFormSelectProps {
  userId: string;
  settlementRef: string;
}

AddressFormElements.FieldAddressSelect = function FieldAddressSelect(
  props: AddressFormSelectProps,
) {
  const { userId, settlementRef } = props;
  const { control, getFieldState } = useFormContext<AddressFormDefaultValues>();

  if (!getFieldState("addressList")) return null;

  return (
    <FormField
      control={control}
      name="addressList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select address</FormLabel>
          <AddressSelectElement
            onSelectAddress={field.onChange}
            userId={userId}
            settlementRef={settlementRef}
            addressActive={field.value?.[0]}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

AddressFormElements.FieldAddressMultiSelect = function FieldAddressMultiSelect(
  props: AddressFormSelectProps,
) {
  const { userId, settlementRef } = props;
  const { control, getFieldState } = useFormContext<AddressFormDefaultValues>();

  if (!getFieldState("addressList")) return null;

  return (
    <FormField
      control={control}
      name="addressList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select address list</FormLabel>
          <AddressMultiSelectElement
            addressListActive={field.value}
            onSelectAddress={field.onChange}
            userId={userId}
            settlementRef={settlementRef}
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
