"use client";
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
import { Spinner } from "@/shared/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { Profile } from "../profile";
import { AvatarField } from "./avatarField";
import { ProfileFormValues, profileFormSchema } from "../_domain/form.schema";
import { useAppearanceDelay } from "@/shared/lib/react";

interface ProfileFormProps extends HTMLAttributes<HTMLFormElement> {
  profile: Profile;
  handleSubmit: (data: ProfileFormValues) => void;
  isPending: boolean;
  submitText?: string;
}

export const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { profile, handleSubmit: onSubmit, submitText, isPending } = props;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: profile.email,
      image: profile.image ?? undefined,
      name: profile.name ?? "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);

    // form.reset();
  });
  const isPendingAppearance = useAppearanceDelay(isPending);

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
        <Button type="submit" disabled={isPendingAppearance}>
          {isPendingAppearance && (
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
