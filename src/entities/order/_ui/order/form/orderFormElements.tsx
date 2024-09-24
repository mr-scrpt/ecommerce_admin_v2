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
  orderDefaultFieldsValues,
  orderFormDefaultSchema,
} from "../../../_domain/order/form.schema";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import { OrderStatusStateSelectElement } from "./elements/orderStatusStateSelectElement";
import { OrderStatusPaymentSelectElement } from "./elements/orderStatusPaymentSelectElement";

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
  FieldOrderStatusStateSelect: FC;
  FieldOrderStatusPaymentSelect: FC;
  SubmitButton: ButtonSubmitComponentType;
};

type OrderFormElementsType = OrderFormElementsComponent & OrderFormFields;

const getDefaultFormValues = <T extends OrderFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...orderDefaultFieldsValues,
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

  // console.log("output_log: Form values =>>>", form.getValues());

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {children}
        <FormMessage />
      </form>
    </FormProvider>
  );
};

OrderFormElements.FieldOrderStatusStateSelect =
  function FieldOrderStatusStateSelect() {
    const { control, getFieldState } = useFormContext<OrderFormDefaultValues>();

    if (!getFieldState("orderStatusStateList")) return null;

    return (
      <FormField
        control={control}
        name="orderStatusStateList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select order status</FormLabel>
            <OrderStatusStateSelectElement
              onSelectOrder={field.onChange}
              orderActive={field.value?.[0]}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

OrderFormElements.FieldOrderStatusPaymentSelect =
  function FieldOrderStatusPaymentSelect() {
    const { control, getFieldState } = useFormContext<OrderFormDefaultValues>();

    if (!getFieldState("orderStatusPaymentList")) return null;

    return (
      <FormField
        control={control}
        name="orderStatusPaymentList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select payment status</FormLabel>
            <OrderStatusPaymentSelectElement
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
