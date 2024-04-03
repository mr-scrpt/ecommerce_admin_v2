"use client";
import { buildDate } from "@/shared/lib/date";
import { ROLES } from "@/shared/lib/user";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { UserFormValues, userFormSchema } from "../_domain/user.schema";
import { UserPartial } from "../user";
import { AvatarField } from "./avatarField";
import { PhoneInput } from "@/shared/ui/phoneInput";
import { Country } from "react-phone-number-input";
import { z } from "zod";

interface UserFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  user?: UserPartial;
  handleSubmit: (data: UserFormValues) => void;
}

interface OrderSubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

type UserFormElementsType = FC<UserFormElementsProps> & {
  FieldRole: FC<{ disabled?: boolean }>;
  FieldEmailVerified: FC<{ disabled?: boolean }>;
  FieldEmail: FC<{}>;
  FieldPhone: FC<{ countryDefault?: Country }>;
  FieldName: FC<{}>;
  FieldAvatar: FC<{ user?: UserPartial }>;
  SubmitButton: FC<OrderSubmitFieldProps>;
};

const getDefaultValues = (user?: UserPartial) => ({
  email: user?.email,
  name: user?.name ?? "",
  image: user?.image ?? "",
  phone: user?.phone ?? "",
  emailVerified: user?.emailVerified,
  role: user?.role ?? ROLES.USER,
});

export const UserFormElements: UserFormElementsType = (props) => {
  const { user, handleSubmit: onSubmit, children } = props;

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: getDefaultValues(user),
  });

  useEffect(() => {
    form.reset(getDefaultValues(user));
  }, [user, form]);

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

UserFormElements.FieldRole = function FieldRole(props) {
  const { disabled = true } = props;
  const { control } = useFormContext<UserFormValues>();
  return (
    <FormField
      control={control}
      disabled={disabled}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

UserFormElements.FieldEmailVerified = function FieldEmailVerified(props) {
  const { disabled = true } = props;
  const { control } = useFormContext<UserFormValues>();
  return (
    <FormField
      control={control}
      name="emailVerified"
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email verified</FormLabel>
          <FormControl>
            <Input
              placeholder=""
              {...field}
              value={field.value ? buildDate(field.value) : "Not Verified"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

UserFormElements.FieldEmail = function FieldEmail() {
  const { control } = useFormContext<UserFormValues>();
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

UserFormElements.FieldPhone = function FieldPhone(props) {
  const { countryDefault = "UA" } = props;
  const { control } = useFormContext<UserFormValues>();

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

UserFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<UserFormValues>();

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
// UserFormElements.FieldTest = function FieldName() {
//   const { control, register } = useFormContext();
//
//   return (
//     <FormField
//       control={control}
//       name="test"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Name</FormLabel>
//           <FormControl>
//             <Input placeholder="" {...field} />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

UserFormElements.FieldAvatar = function FieldAvatar(props) {
  const { user } = props;
  const { control } = useFormContext<UserFormValues>();

  return (
    <FormField
      control={control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Avatar</FormLabel>
          <FormControl>
            <AvatarField
              value={field.value}
              onChange={field.onChange}
              forLetters={user?.email ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

UserFormElements.SubmitButton = function SubmitButton(props) {
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
