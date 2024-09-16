"use client";
import { ButtonSubmitComponentType } from "@/shared/type/button";
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
  ReceiverFormDefaultValues,
  receiverDefaultFieldsValues,
  receiverFormDefaultSchema,
} from "../../_domain/form.schema";
import { ReceiverLastNameElement } from "./elements/receiverLastNameElement";
import { ReceiverNameElement } from "./elements/receiverNameElement";
import { ReceiverPhoneElement } from "./elements/receiverPhoneElement";
import { ReceiverSelectElement } from "./elements/receiverSelectElement";
interface ReceiverFormElementsProps<T extends ReceiverFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type ReceiverFormElementsComponent = <
  T extends ReceiverFormDefaultValues = ReceiverFormDefaultValues,
>(
  props: ReceiverFormElementsProps<T>,
) => React.ReactElement;

type ReceiverFormFields = {
  FieldName: FC;
  FieldLastName: FC;
  FieldPhone: FC;
  FieldReceiverSelect: FC<ReceiverFormSelectProps>;
  SubmitButton: ButtonSubmitComponentType;
};

type ReceiverFormElementsType = ReceiverFormElementsComponent &
  ReceiverFormFields;

const getDefaultFormValues = <T extends ReceiverFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...receiverDefaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const ReceiverFormElements: ReceiverFormElementsType = <
  T extends ReceiverFormDefaultValues,
>(
  props: ReceiverFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? receiverFormDefaultSchema),
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

ReceiverFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<ReceiverFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Receiver name</FormLabel>
          <ReceiverNameElement onChange={field.onChange} value={field.value} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ReceiverFormElements.FieldLastName = function FieldLastName() {
  const { control } = useFormContext<ReceiverFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Receiver last name</FormLabel>
          <ReceiverLastNameElement
            onChange={field.onChange}
            value={field.value}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ReceiverFormElements.FieldPhone = function FieldPhone() {
  const { control } = useFormContext<ReceiverFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Receiver phone</FormLabel>
          <ReceiverPhoneElement onChange={field.onChange} value={field.value} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface ReceiverFormSelectProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
}

ReceiverFormElements.FieldReceiverSelect = function FieldReceiverSelect(
  props: ReceiverFormSelectProps,
) {
  const { userId } = props;
  const { control } = useFormContext<ReceiverFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="receiverList"
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

ReceiverFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}) {
  return (
    <Button type="submit" disabled={isPending} className={cn(className)}>
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Receiver updating..."
        />
      )}
      {submitText}
    </Button>
  );
};
