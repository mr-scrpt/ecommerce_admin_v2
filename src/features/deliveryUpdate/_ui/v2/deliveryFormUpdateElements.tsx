"use client";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
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
  DeliveryUpdateFormDefaultValues,
  defaultFieldsValues,
  deliveryUpdateFormDefaultSchema,
} from "../../_domain/form.schema";
import { DeliveryTypeRadioSectionElement } from "./elements/deliveryTypeRadioSectionElement";

interface DeliveryFormUpdateElementsProps<
  T extends DeliveryUpdateFormDefaultValues,
> extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type DeliveryFormUpdateElementsComponent = <
  T extends DeliveryUpdateFormDefaultValues = DeliveryUpdateFormDefaultValues,
>(
  props: DeliveryFormUpdateElementsProps<T>,
) => React.ReactElement;

type DeliveryFormUpdateFields = {
  FieldDeliveryTypeRadioSection: FC;
  SubmitButton: ButtonSubmitComponentType;
};

type DeliveryFormUpdateElementsType = DeliveryFormUpdateElementsComponent &
  DeliveryFormUpdateFields;

const getDefaultFormValues = <T extends DeliveryUpdateFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...defaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const DeliveryFormUpdateElements: DeliveryFormUpdateElementsType = <
  T extends DeliveryUpdateFormDefaultValues,
>(
  props: DeliveryFormUpdateElementsProps<T>,
) => {
  const { handleSubmit: onSubmit, schema, defaultValues, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? deliveryUpdateFormDefaultSchema),
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
        <FormMessage />
      </form>
    </FormProvider>
  );
};

DeliveryFormUpdateElements.FieldDeliveryTypeRadioSection =
  function FieldDeliveryRadio() {
    const { control, getFieldState, watch } =
      useFormContext<DeliveryUpdateFormDefaultValues>();

    if (!getFieldState("deliveryType")) return null;

    const settlement = watch("settlement");

    return (
      <FormField
        control={control}
        name="deliveryType"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Delivery type select</FormLabel>
              <DeliveryTypeRadioSectionElement
                deliveryActive={field.value}
                onSelectDelivery={field.onChange}
                settlementRef={settlement?.value}
              />
            </FormItem>
          );
        }}
      />
    );
  };

DeliveryFormUpdateElements.SubmitButton = function SubmitButton({
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
