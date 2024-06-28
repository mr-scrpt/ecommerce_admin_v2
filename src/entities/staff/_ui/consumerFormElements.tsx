"use client";
import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Input } from "@/shared/ui/input";
import { PhoneInput } from "@/shared/ui/phoneInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Country } from "react-phone-number-input";
import { ZodTypeAny } from "zod";
import {
  ConsumerFormDefaultValues,
  consumerFormDefaultSchema,
} from "../_domain/form.schema";

interface ConsumerFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  consumer?: Consumer;
  handleSubmit: (data: ConsumerFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

interface ConsumerSubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

type ConsumerFormElementsType = FC<ConsumerFormElementsProps> & {
  FieldName: FC;
  FieldEmail: FC;
  FieldPhone: FC<{ countryDefault?: Country }>;
  SubmitButton: FC<ConsumerSubmitFieldProps>;
};

const getDefaultValues = (consumer?: Consumer) => ({
  name: consumer?.name ?? "",
  email: consumer?.email ?? "",
  image: consumer?.image ?? "",
  phone: consumer?.phone ?? "",
});

export const ConsumerFormElements: ConsumerFormElementsType = (props) => {
  const { consumer, handleSubmit: onSubmit, children, schema } = props;

  const form = useForm<ConsumerFormDefaultValues>({
    resolver: zodResolver(schema ?? consumerFormDefaultSchema),
    defaultValues: getDefaultValues(consumer),
  });

  useEffect(() => {
    form.reset(getDefaultValues(consumer));
  }, [consumer, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

ConsumerFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<ConsumerFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ConsumerFormElements.FieldEmail = function FieldEmail() {
  const { control } = useFormContext<ConsumerFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ConsumerFormElements.FieldPhone = function FieldPhone(props) {
  const { countryDefault = "UA" } = props;
  const { control } = useFormContext<ConsumerFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel className="text-left">Phone Number</FormLabel>
          <FormControl className="w-full">
            <PhoneInput
              placeholder="Enter a phone number"
              defaultCountry={countryDefault as Country}
              initialValueFormat="national"
              {...field}
            />
          </FormControl>
          <FormDescription className="text-left">
            Enter a phone number
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ConsumerFormElements.SubmitButton = function SubmitButton(props) {
  const { isPending, submitText } = props;
  return (
    <Button type="submit" disabled={isPending}>
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
