"use client";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
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

  const { isPending, isSuccess, signIn, callbackUrl } = useTestEmailSignIn();
  const link = generateTestLink({
    callbackUrl: callbackUrl ?? "",
    token: testToken,
    email: form.getValues("email"),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => signIn(data.email))}>
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
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={isPending}>
            {isPending && (
              <Spinner className="mr-2 h-4 w-4 " aria-label="Загрузка выхода" />
            )}
            Loggin by email
          </Button>
          {isSuccess && (
            <a
              className="text-sm text-muted-foreground text-underline"
              href={link}
            >
              Simple login only for testing
            </a>
          )}
        </div>
      </form>
    </Form>
  );
};
