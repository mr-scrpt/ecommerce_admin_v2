"use client";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
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
  StaffFormDefaultValues,
  staffDefaultFieldsValues,
  staffFormDefaultSchema,
} from "../../_domain/form.schema";
import { StaffEmailElement } from "./elements/staffEmailElement";
import { StaffLastNameElement } from "./elements/staffLastNameElement";
import { StaffNameElement } from "./elements/staffNameElement";
import { StaffPhoneElement } from "./elements/staffPhoneElement";

interface StaffFormElementsProps<T extends StaffFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type StaffFormElementsComponent = <
  T extends StaffFormDefaultValues = StaffFormDefaultValues,
>(
  props: StaffFormElementsProps<T>,
) => React.ReactElement;

type StaffFormFields = {
  FieldName: FC;
  FieldLastName: FC;
  FieldEmail: FC;
  FieldPhone: FC<{ countryDefault?: Country }>;
  // FieldStaffSelectSearch: FC;
  SubmitButton: ButtonSubmitComponentType;
};

type StaffFormElementsType = StaffFormElementsComponent & StaffFormFields;

const getDefaultFormValues = <T extends StaffFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...staffDefaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const StaffFormElements: StaffFormElementsType = <
  T extends StaffFormDefaultValues,
>(
  props: StaffFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, children, schema } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? staffFormDefaultSchema),
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

StaffFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<StaffFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <StaffNameElement value={field.value} onChange={field.onChange} />
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
          <StaffLastNameElement value={field.value} onChange={field.onChange} />
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
          <StaffEmailElement value={field.value} onChange={field.onChange} />
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
          <StaffPhoneElement
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

// StaffFormElements.FieldStaffSelectSearch = function FieldStaffSelectSearch() {
//   const { control } = useFormContext<StaffFormDefaultValues>();
//
//   return (
//     <FormField
//       control={control}
//       name="staff"
//       render={({ field }) => (
//         <FormItem className="flex flex-col items-start">
//           <FormLabel className="text-left">Staff</FormLabel>
//           <FormControl className="w-full">
//             <StaffSelectSearchElement
//               staffActive={field.value}
//               onSelectStaff={field.onChange}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

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
