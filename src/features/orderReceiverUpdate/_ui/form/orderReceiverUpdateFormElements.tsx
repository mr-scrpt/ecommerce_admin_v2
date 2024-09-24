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
  OrderReceiverUpdateFormValues,
  orderReceiverUpdateFieldsValues,
  orderReceiverUpdateFormSchema,
} from "../../_domain/form.schema";
import { ReceiverSelectElement } from "@/entities/receiver";

interface OrderReceiverFormUpdateElementsProps<
  T extends OrderReceiverUpdateFormValues,
> extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type OrderReceiverFormUpdateElementsComponent = <
  T extends OrderReceiverUpdateFormValues = OrderReceiverUpdateFormValues,
>(
  props: OrderReceiverFormUpdateElementsProps<T>,
) => React.ReactElement;

type OrderReceiverFormUpdateFields = {
  FieldOrderReceiverSelect: FC<FieldOrderReceiverSectionProps>;
  SubmitButton: ButtonSubmitComponentType;
};

type OrderReceiverFormUpdateElementsType =
  OrderReceiverFormUpdateElementsComponent & OrderReceiverFormUpdateFields;

const getDefaultFormValues = <T extends OrderReceiverUpdateFormValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...orderReceiverUpdateFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const OrderReceiverUpdateFormElements: OrderReceiverFormUpdateElementsType =
  <T extends OrderReceiverUpdateFormValues>(
    props: OrderReceiverFormUpdateElementsProps<T>,
  ) => {
    const { handleSubmit: onSubmit, schema, defaultValues, children } = props;

    const form = useForm<T>({
      resolver: zodResolver(schema ?? orderReceiverUpdateFormSchema),
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

interface FieldOrderReceiverSectionProps {
  userId: string;
}

OrderReceiverUpdateFormElements.FieldOrderReceiverSelect =
  function FieldReceiverSelect(props: FieldOrderReceiverSectionProps) {
    const { userId } = props;
    const { control } = useFormContext<OrderReceiverUpdateFormValues>();

    return (
      <FormField
        control={control}
        name="orderReceiverList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Receiver list</FormLabel>
            <ReceiverSelectElement
              onSelectReceiver={field.onChange}
              userId={userId}
              receiverActive={field.value?.[0]}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

OrderReceiverUpdateFormElements.SubmitButton = function SubmitButton({
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
