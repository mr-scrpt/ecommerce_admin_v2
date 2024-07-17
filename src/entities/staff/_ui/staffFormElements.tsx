"use client";
import { Staff } from "@/kernel/domain/staff/staff.type";
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
  StaffFormDefaultValues,
  staffFormDefaultSchema,
} from "../_domain/form.schema";

interface StaffFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  staff?: Staff;
  handleSubmit: (data: StaffFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

interface StaffSubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

type StaffFormElementsType = FC<StaffFormElementsProps> & {
  FieldName: FC;
  FieldLastName: FC;
  FieldEmail: FC;
  FieldPhone: FC<{ countryDefault?: Country }>;
  SubmitButton: FC<StaffSubmitFieldProps>;
};

const getDefaultValues = (staff?: Staff) => ({
  name: staff?.name ?? "",
  lastName: staff?.lastName ?? "",
  email: staff?.email ?? "",
  image: staff?.image ?? "",
  phone: staff?.phone ?? "",
});

export const StaffFormElements: StaffFormElementsType = (props) => {
  const { staff, handleSubmit: onSubmit, children, schema } = props;

  const form = useForm<StaffFormDefaultValues>({
    resolver: zodResolver(schema ?? staffFormDefaultSchema),
    defaultValues: getDefaultValues(staff),
  });

  useEffect(() => {
    form.reset(getDefaultValues(staff));
  }, [staff, form]);

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

StaffFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<StaffFormDefaultValues>();

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

StaffFormElements.FieldLastName = function FieldLastName() {
  const { control } = useFormContext<StaffFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

StaffFormElements.FieldEmail = function FieldEmail() {
  const { control } = useFormContext<StaffFormDefaultValues>();
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

StaffFormElements.FieldPhone = function FieldPhone(props) {
  const { countryDefault = "UA" } = props;
  const { control } = useFormContext<StaffFormDefaultValues>();

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

StaffFormElements.SubmitButton = function SubmitButton(props) {
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
