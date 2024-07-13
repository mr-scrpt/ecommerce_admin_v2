"use client";
import { Receiver } from "@/kernel/domain/receiver/receiver.type";
import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  ReceiverFormDefaultValues,
  receiverFormDefaultSchema,
} from "../../../_domain/form.schema";
import { ReceiverPhoneElement } from "./receiverPhoneElement";
import { ReceiverNameElement } from "./receiverNameElement";
import { ReceiverLastNameElement } from "./receiverLastNameElement";
import { ReceiverSelectElement } from "./receiverSelectElement";

interface ReceiverFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  receiverData?: Receiver;
  handleSubmit: (data: ReceiverFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

type ReceiverFormElementsType = FC<ReceiverFormElementsProps> & {
  // TODO: Select settlement entities
  FieldName: FC;
  FieldLastName: FC;
  FieldPhone: FC;
  FieldReceiverSelect: FC;
  SubmitButton: FC<{
    isPending: boolean;
    submitText: string;
    className?: string;
  }>;
};

const getDefaultValues = (receiverData?: Receiver) => ({
  name: receiverData?.name,
  lastName: receiverData?.lastName,
  phone: receiverData?.phone,
  userId: receiverData?.userId,
  receiverId: receiverData?.id ?? "",
});

export const ReceiverFormElements: ReceiverFormElementsType = (props) => {
  const { receiverData, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<ReceiverFormDefaultValues>({
    resolver: zodResolver(schema ?? receiverFormDefaultSchema),
    defaultValues: getDefaultValues(receiverData),
  });

  useEffect(() => {
    form.reset(getDefaultValues(receiverData));
  }, [receiverData, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);
  });
  console.log("output_log:  =>>> form errors", form.formState.errors);

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
          <ReceiverNameElement onChange={field.onChange} />
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
          <ReceiverLastNameElement onChange={field.onChange} />
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
          <ReceiverPhoneElement onChange={field.onChange} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ReceiverFormElements.FieldReceiverSelect = function FieldReceiverSelect() {
  const { control } = useFormContext<ReceiverFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="receiverId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Receiver list</FormLabel>
          <ReceiverSelectElement
            userId={field.value}
            onSelectReceiver={field.onChange}
            receiverInit={field.value}
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
