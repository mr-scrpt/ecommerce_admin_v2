"use client";
import { FC, HTMLAttributes } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { useForm } from "react-hook-form";
import { useEmailSignIn } from "../vm/useEmailSignIn";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/icons/spinner";
import { useTestEmailSignIn } from "../vm/useTestEmailSignIn";
import { generateTestLink } from "../_lib/generateTestAuthLink";

interface TestEmailSignInFormProps extends HTMLAttributes<HTMLDivElement> {
  testToken: string;
}

export const TestEmailSignInForm: FC<TestEmailSignInFormProps> = (props) => {
  const { testToken } = props;
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  const emailSignIn = useTestEmailSignIn();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => emailSignIn.signIn(data.email))}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={emailSignIn.isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={emailSignIn.isPending}>
            {emailSignIn.isPending && (
              <Spinner className="mr-2 h-4 w-4 " aria-label="Загрузка выхода" />
            )}
            Войти через Email
          </Button>
          {emailSignIn.isSuccess && (
            <a
              className="text-sm text-muted-foreground text-underline"
              href={generateTestLink({
                callbackUrl: emailSignIn.callbackUrl ?? "",
                token: testToken,
                email: form.getValues("email"),
              })}
            >
              Упрощённый тестовый вход
            </a>
          )}
        </div>
      </form>
    </Form>
  );
};
