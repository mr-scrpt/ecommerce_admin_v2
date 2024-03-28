"use client";
import { useAppearanceDelay } from "@/shared/lib/react";
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
import { useForm } from "react-hook-form";
import { Profile, profileFormSchema } from "../profile";
import { AvatarField } from "./avatarField";
import { PhoneInput } from "@/shared/ui/phoneInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

interface ProfileFormProps extends HTMLAttributes<HTMLFormElement> {
  profile: Profile;
  handleSubmit: (data: ProfileFormValuesWithPhoneValidation) => void;
  isPending: boolean;
  submitText?: string;
}

const profileFormWithPhoneValidationSchema = z.object({
  ...profileFormSchema.shape,
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
});

type ProfileFormValuesWithPhoneValidation = z.infer<
  typeof profileFormWithPhoneValidationSchema
>;

const getDefaultValues = (profile: Profile) => ({
  email: profile.email,
  phone: profile.phone ?? "",
  image: profile.image ?? "",
  name: profile.name ?? "",
});

export const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { profile, handleSubmit: onSubmit, submitText, isPending } = props;

  const form = useForm<ProfileFormValuesWithPhoneValidation>({
    resolver: zodResolver(profileFormWithPhoneValidationSchema),
    defaultValues: getDefaultValues(profile),
  });

  useEffect(() => {
    form.reset(getDefaultValues(profile));
  }, [profile, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);
  });

  const isPendingAppearance = useAppearanceDelay(isPending);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
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
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Phone Number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput
                  placeholder="Enter a phone number"
                  defaultCountry="UA"
                  initialValueFormat="national"
                  {...field}
                  // value={"+380"}
                  // defaultValue={field.value ?? ""}
                />
              </FormControl>
              <FormDescription className="text-left">
                Enter a phone number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input readOnly placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <AvatarField
                  value={field.value}
                  onChange={field.onChange}
                  forLetters={profile.email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPendingAppearance}>
          {isPendingAppearance && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-label="Profile updating..."
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
