"use client";
import { ButtonSubmitComponentType } from "@/shared/type/button";
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
  ProfileFormDefaultValues,
  profileDefaultFieldsValues,
  profileFormDefaultSchema,
} from "../../_domain/form.schema";
import { AvatarField } from "../avatarField";
import { ProfileEmailElement } from "./elements/profileEmailElement";
import { ProfileLastNameElement } from "./elements/profileLastNameElement";
import { ProfileNameElement } from "./elements/profileNameElement";
import { ProfilePhoneElement } from "./elements/profilePhoneElement";

interface ProfileFormElementsProps<T extends ProfileFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type ProfileFormElementsComponent = <
  T extends ProfileFormDefaultValues = ProfileFormDefaultValues,
>(
  props: ProfileFormElementsProps<T>,
) => React.ReactElement;

type ProfileFormFields = {
  FieldName: FC;
  FieldLastName: FC;
  FieldEmail: FC;
  FieldPhone: FC<{ countryDefault?: Country }>;
  FieldAvatar: FC;
  // FieldProfileSelectSearch: FC;
  // FieldProfileSelect: FC;
  // FieldProfileMultiSelect: FC;
  SubmitButton: ButtonSubmitComponentType;
};

type ProfileFormElementsType = ProfileFormElementsComponent & ProfileFormFields;

const getDefaultFormValues = <T extends ProfileFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...profileDefaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const ProfileFormElements: ProfileFormElementsType = <
  T extends ProfileFormDefaultValues,
>(
  props: ProfileFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, children, schema } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? profileFormDefaultSchema),
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

ProfileFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<ProfileFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <ProfileNameElement value={field.value} onChange={field.onChange} />
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
          <FormLabel>Last Name</FormLabel>
          <ProfileLastNameElement
            value={field.value}
            onChange={field.onChange}
          />
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
          <ProfileEmailElement value={field.value} onChange={field.onChange} />
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
          <ProfilePhoneElement
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

ProfileFormElements.FieldAvatar = function FieldAvatar() {
  // const { profile } = props;
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
              avatarUrl={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// ProfileFormElements.FieldProfileSelectSearch =
//   function FieldProfileSelectSearch() {
//     const { control } = useFormContext<ProfileFormDefaultValues>();
//
//     return (
//       <FormField
//         control={control}
//         name="profile"
//         render={({ field }) => (
//           <FormItem className="flex flex-col items-start">
//             <FormLabel className="text-left">Profile</FormLabel>
//             <FormControl className="w-full">
//               <ProfileSelectSearchElement
//                 profileActive={field.value}
//                 onSelectProfile={field.onChange}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     );
//   };
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
