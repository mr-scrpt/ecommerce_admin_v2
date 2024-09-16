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
import { ButtonSubmitComponentType } from "@/shared/type/button";
import {
  OrderRowFormDefaultValues,
  orderRowDefaultFieldsValues,
  orderRowFormDefaultSchema,
} from "../../../_domain/orderRow/form.schema";
import { OrderRowQuantityElement } from "./elements/orderRowQuantityElement";

interface OrderRowFormElementsProps<T extends OrderRowFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type OrderRowFormElementsComponent = <
  T extends OrderRowFormDefaultValues = OrderRowFormDefaultValues,
>(
  props: OrderRowFormElementsProps<T>,
) => React.ReactElement;

type OrderRowFormFields = {
  FieldOrderRowQuantity: FC;
  SubmitButton: ButtonSubmitComponentType;
};

type OrderRowFormElementsType = OrderRowFormElementsComponent &
  OrderRowFormFields;

const getDefaultFormValues = <T extends OrderRowFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...orderRowDefaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const OrderRowFormElements: OrderRowFormElementsType = <
  T extends OrderRowFormDefaultValues,
>(
  props: OrderRowFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? orderRowFormDefaultSchema),
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

OrderRowFormElements.FieldOrderRowQuantity =
  function FieldOrderRowStatusSelect() {
    const { control, getFieldState } =
      useFormContext<OrderRowFormDefaultValues>();

    return (
      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantity</FormLabel>
            <OrderRowQuantityElement
              onChange={field.onChange}
              value={field.value}
            />

            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    );
  };

OrderRowFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}) {
  return (
    <Button type="submit" disabled={isPending} className={cn(className)}>
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="OrderRow updating..."
        />
      )}
      {submitText}
    </Button>
  );
};
