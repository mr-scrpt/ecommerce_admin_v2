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
import { FC, FormHTMLAttributes, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Country } from "react-phone-number-input";
import { ZodTypeAny } from "zod";
import { AvatarField } from "./avatarField";
import { Profile } from "@/kernel/domain/profile/profile.type";
import {
  ProfileFormDefaultValues,
  profileFormDefaultSchema,
} from "../_domain/form.schema";

interface ProfileFormElementsProps extends FormHTMLAttributes<HTMLFormElement> {
  profile: Profile;
  handleSubmit: (data: ProfileFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

interface ProfileSubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

type ProfileFormElementsType = FC<ProfileFormElementsProps> & {
  FieldName: FC;
  FieldLastName: FC;
  FieldEmail: FC;
  FieldPhone: FC<{ countryDefault?: Country }>;
  FieldAvatar: FC<{ profile?: Profile }>;
  SubmitButton: FC<ProfileSubmitFieldProps>;
};

const getDefaultValues = (profile: Profile) => ({
  name: profile.name ?? "",
  lastName: profile.lastName ?? "",
  email: profile.email,
  phone: profile.phone ?? "",
  image: profile.image ?? "",
});

export const ProfileFormElements: ProfileFormElementsType = (props) => {
  const { profile, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<ProfileFormDefaultValues>({
    resolver: zodResolver(schema ?? profileFormDefaultSchema),
    defaultValues: getDefaultValues(profile),
  });

  useEffect(() => {
    form.reset(getDefaultValues(profile));
  }, [profile, form]);

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

ProfileFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<ProfileFormDefaultValues>();

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

ProfileFormElements.FieldLastName = function FieldLastName() {
  const { control } = useFormContext<ProfileFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>LastName</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
ProfileFormElements.FieldEmail = function FieldEmail() {
  const { control } = useFormContext<ProfileFormDefaultValues>();
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

ProfileFormElements.FieldPhone = function FieldPhone(props) {
  const { countryDefault = "UA" } = props;
  const { control } = useFormContext<ProfileFormDefaultValues>();

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

ProfileFormElements.FieldAvatar = function FieldAvatar(props) {
  const { profile } = props;
  const { control, watch } = useFormContext<ProfileFormDefaultValues>();

  const email = watch("email");
  const name = watch("name");

  return (
    <FormField
      control={control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Avatar</FormLabel>
          <FormControl>
            <AvatarField
              // value={field.value}
              onChange={field.onChange}
              avatarName={name ?? email}
              avatarUrl={field.value ?? profile?.image ?? ""}
              // forLetters={profile?.email ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ProfileFormElements.SubmitButton = function SubmitButton(props) {
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
