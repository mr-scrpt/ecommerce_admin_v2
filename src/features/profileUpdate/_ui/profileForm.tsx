"use client";
import { Profile } from "@/entities/user/profile";
import { UserId } from "@/entities/user/user";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AvatarField } from "./avatarField";
import { useUpdateProfile } from "../_vm/useUpdateProfile";
import { Spinner } from "@/shared/ui/icons/spinner";

const profileFormSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const getDefaultValues = (profile: Profile) => ({
  email: profile.email,
  image: profile.image ?? undefined,
  name: profile.name ?? "",
});

interface ProfileFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: UserId;
  profile: Profile;
  onSuccess?: () => void;
  submitText?: string;
}

export const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { userId, profile, onSuccess, submitText } = props;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(profile),
  });

  const updateProfile = useUpdateProfile();

  const handleSubmit = form.handleSubmit(async (data) => {
    const newProfile = await updateProfile.update({
      userId,
      data,
    });

    form.reset(getDefaultValues(newProfile.profile));
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          disabled
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
          name="image"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <AvatarField value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {updateProfile.isPending && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-label="Обновление профиля"
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
