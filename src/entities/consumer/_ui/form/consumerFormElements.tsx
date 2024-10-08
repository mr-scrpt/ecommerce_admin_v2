"use client";
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
import {
  DefaultValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Country } from "react-phone-number-input";
import { ZodTypeAny } from "zod";
import {
  ConsumerFormDefaultValues,
  consumerFormDefaultSchema,
  defaultFieldsValues,
} from "../../_domain/form.schema";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import { ConsumerNameElement } from "./elements/consumerNameElement";
import { ConsumerLastNameElement } from "./elements/consumerLastNameElement";
import { ConsumerEmailElement } from "./elements/consumerEmailElement";
import { ConsumerPhoneElement } from "./elements/consumerPhoneElement";

// interface ConsumerFormElementsProps extends HTMLAttributes<HTMLFormElement> {
//   consumer?: Consumer;
//   handleSubmit: (data: ConsumerFormDefaultValues) => void;
//   schema?: ZodTypeAny;
// }
//
// interface ConsumerSubmitFieldProps {
//   isPending?: boolean;
//   submitText: string;
//   className?: string;
// }
//
// type ConsumerFormElementsType = FC<ConsumerFormElementsProps> & {
//   FieldName: FC;
//   FieldLastName: FC;
//   FieldEmail: FC;
//   FieldPhone: FC<{ countryDefault?: Country }>;
//   SubmitButton: FC<ConsumerSubmitFieldProps>;
// };
//
// const getDefaultValues = (consumer?: Consumer) => ({
//   name: consumer?.name ?? "",
//   lastName: consumer?.lastName ?? "",
//   email: consumer?.email ?? "",
//   image: consumer?.image ?? "",
//   phone: consumer?.phone ?? "",
// });
interface ConsumerFormElementsProps<T extends ConsumerFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type ConsumerFormElementsComponent = <
  T extends ConsumerFormDefaultValues = ConsumerFormDefaultValues,
>(
  props: ConsumerFormElementsProps<T>,
) => React.ReactElement;

type ConsumerFormFields = {
  FieldName: FC;
  FieldLastName: FC;
  FieldEmail: FC;
  FieldPhone: FC<{ countryDefault?: Country }>;
  FieldConsumerSelect: FC;
  FieldConsumerMultiSelect: FC;
  SubmitButton: ButtonSubmitComponentType;
};

type ConsumerFormElementsType = ConsumerFormElementsComponent &
  ConsumerFormFields;

const getDefaultFormValues = <T extends ConsumerFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...defaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const ConsumerFormElements: ConsumerFormElementsType = <
  T extends ConsumerFormDefaultValues,
>(
  props: ConsumerFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, children, schema } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? consumerFormDefaultSchema),
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
          <ConsumerNameElement value={field.value} onChange={field.onChange} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ConsumerFormElements.FieldLastName = function FieldLastName() {
  const { control } = useFormContext<ConsumerFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <ConsumerLastNameElement
            value={field.value}
            onChange={field.onChange}
          />
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
          <ConsumerEmailElement value={field.value} onChange={field.onChange} />
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
          {/* <FormControl className="w-full"> */}
          {/*   <PhoneInput */}
          {/*     placeholder="Enter a phone number" */}
          {/*     defaultCountry={countryDefault as Country} */}
          {/*     initialValueFormat="national" */}
          {/*     {...field} */}
          {/*   /> */}
          {/* </FormControl> */}
          <ConsumerPhoneElement
            onChange={field.onChange}
            countryDefault={countryDefault}
            value={field.value}
          />
          <FormDescription className="text-left">
            Enter a phone number
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ConsumerFormElements.FieldConsumerSelect = function FieldConsumerSelect(props) {
  const { control } = useFormContext<ConsumerFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="consumerList"
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel className="text-left">Consumer</FormLabel>
          <FormControl className="w-full">
            {/* <ConsumerSelect {...field} /> */}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ConsumerFormElements.FieldConsumerMultiSelect =
  function FieldConsumerMultiSelect(props) {
    const { control } = useFormContext<ConsumerFormDefaultValues>();
    return (
      <FormField
        control={control}
        name="consumerList"
        render={({ field }) => (
          <FormItem className="flex flex-col items-start">
            <FormLabel className="text-left">Consumer</FormLabel>
            <FormControl className="w-full">
              {/* <ConsumerMultiSelect {...field} /> */}
            </FormControl>
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
