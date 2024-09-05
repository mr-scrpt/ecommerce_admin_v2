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
  OrderFormDefaultValues,
  defaultFieldsValues,
  orderFormDefaultSchema,
} from "../../../_domain/order/form.schema";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import {
  OrderPaymentStatusDefaultOption,
  OrderStatusDefaultOption,
} from "@/kernel/domain/order/ui.type";
import { OrderStatusSelectElement } from "./elements/orderSelectElement";
import { OrderPaymentStatusSelectElement } from "./elements/orderPaymentSelectElement";

interface OrderFormElementsProps<T extends OrderFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type OrderFormElementsComponent = <
  T extends OrderFormDefaultValues = OrderFormDefaultValues,
>(
  props: OrderFormElementsProps<T>,
) => React.ReactElement;

type OrderFormFields = {
  FieldOrderStatusSelect: FC;
  FieldOrderPaymentStatusSelect: FC;
  SubmitButton: ButtonSubmitComponentType;
};

type OrderFormElementsType = OrderFormElementsComponent & OrderFormFields;

const getDefaultFormValues = <T extends OrderFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...defaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const OrderFormElements: OrderFormElementsType = <
  T extends OrderFormDefaultValues,
>(
  props: OrderFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? orderFormDefaultSchema),
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

OrderFormElements.FieldOrderStatusSelect = function FieldOrderStatusSelect() {
  const { control, getFieldState } = useFormContext<OrderFormDefaultValues>();

  if (!getFieldState("orderStatusList")) return null;

  return (
    <FormField
      control={control}
      name="orderStatusList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select order status</FormLabel>
          <OrderStatusSelectElement
            onSelectOrder={field.onChange}
            orderActive={field.value?.[0]}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

OrderFormElements.FieldOrderPaymentStatusSelect =
  function FieldOrderPaymentStatusSelect() {
    const { control, getFieldState } = useFormContext<OrderFormDefaultValues>();

    if (!getFieldState("orderPaymentStatusList")) return null;

    return (
      <FormField
        control={control}
        name="orderPaymentStatusList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select payment status</FormLabel>
            <OrderPaymentStatusSelectElement
              onSelectOrderPayment={field.onChange}
              orderActive={field.value?.[0]}
            />
            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    );
  };

OrderFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}) {
  return (
    <Button type="submit" disabled={isPending} className={cn(className)}>
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Order updating..."
        />
      )}
      {submitText}
    </Button>
  );
};
