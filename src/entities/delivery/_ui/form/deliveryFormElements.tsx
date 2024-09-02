"use client";
import { DeliveryTypeDefaultOption } from "@/kernel/domain/delivery/ui.type";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
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
  DeliveryFormDefaultValues,
  deliveryFormDefaultSchema,
} from "../../_domain/form.schema";
import { DeliveryTypeSelectElement } from "./elements/deliveryTypeSelectElement";

interface DeliveryFormElementsProps<T extends DeliveryFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type DeliveryFormElementsComponent = <
  T extends DeliveryFormDefaultValues = DeliveryFormDefaultValues,
>(
  props: DeliveryFormElementsProps<T>,
) => React.ReactElement;

type DeliveryFormFields = {
  FieldDeliveryTypeSelect: FC;
  FieldDeliveryTypeRadio: FC;
  SubmitButton: ButtonSubmitComponentType;
};

type DeliveryFormElementsType = DeliveryFormElementsComponent &
  DeliveryFormFields;

const standartFieldsValues: DeliveryFormDefaultValues = {
  deliveryType: DeliveryTypeDefaultOption,
};

const getDefaultFormValues = <T extends DeliveryFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...standartFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const DeliveryFormElements: DeliveryFormElementsType = <
  T extends DeliveryFormDefaultValues,
>(
  props: DeliveryFormElementsProps<T>,
) => {
  const { handleSubmit: onSubmit, schema, defaultValues, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? deliveryFormDefaultSchema),
    defaultValues: { ...getDefaultFormValues<T>(defaultValues) },
  });

  useEffect(() => {
    form.reset(getDefaultFormValues<T>(defaultValues));
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data: T) => {
    onSubmit?.(data);
  });
  console.log("output_log: form state =>>>", form.getValues());

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {children}
      </form>
    </FormProvider>
  );
};

DeliveryFormElements.FieldDeliveryTypeSelect = function FieldDeliverySelect() {
  const { control, getFieldState } =
    useFormContext<DeliveryFormDefaultValues>();

  if (!getFieldState("deliveryType")) return null;

  return (
    <FormField
      control={control}
      name="deliveryType"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Delivery type select</FormLabel>
            <DeliveryTypeSelectElement
              deliveryActive={field.value}
              onSelectDelivery={field.onChange}
            />
          </FormItem>
        );
      }}
    />
  );
};

DeliveryFormElements.FieldDeliveryTypeRadio = function FieldDeliveryRadio() {
  const { control, getFieldState } =
    useFormContext<DeliveryFormDefaultValues>();

  if (!getFieldState("deliveryType")) return null;

  return (
    <FormField
      control={control}
      name="deliveryType"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Delivery type select</FormLabel>
            <DeliveryTypeSelectElement
              deliveryActive={field.value}
              onSelectDelivery={field.onChange}
            />
          </FormItem>
        );
      }}
    />
  );
};

DeliveryFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className={className}
      aria-disabled={isPending}
    >
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Profile updating..."
        />
      )}
      {submitText}
    </Button>
  );
};
