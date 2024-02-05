"use client";
import { useAppearanceDelay } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
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
import { UserFormValues, userFormSchema } from "../_domain/form.schema";
import { UserPartial } from "../user";
import { AvatarField } from "./avatarField";
import { buildDate } from "@/shared/lib/date";

interface UserFormProps extends HTMLAttributes<HTMLFormElement> {
  user: UserPartial;
  handleSubmit: (data: UserFormValues) => void;
  isPending: boolean;
  submitText?: string;
}

const getDefaultValues = (user: UserPartial) => ({
  email: user.email,
  name: user.name ?? "",
  image: user.image ?? "",
  emailVerified: user.emailVerified,
  role: user.role,
});

export const UserForm: FC<UserFormProps> = (props) => {
  const { user, handleSubmit: onSubmit, submitText, isPending } = props;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: getDefaultValues(user),
  });

  useEffect(() => {
    form.reset(getDefaultValues(user));
  }, [user, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);
  });

  const isPendingAppearance = useAppearanceDelay(isPending);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="role"
          disabled
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
        <FormField
          control={form.control}
          name="emailVerified"
          disabled
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
        <FormField
          control={form.control}
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <AvatarField
                  value={field.value}
                  onChange={field.onChange}
                  forLetters={user.email}
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
