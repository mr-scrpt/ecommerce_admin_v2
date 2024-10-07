"use server";

import { FC, HTMLAttributes, Suspense } from "react";
import { getProviders } from "next-auth/react";
import { cn } from "@/shared/ui/utils";
import { Divider } from "./_ui/Divider";
import { EmailSignInForm } from "./_ui/EmailSignInForm";
import { ProviderButton } from "./_ui/ProviderButton";
import { TestEmailSignInForm } from "./_ui/TestEmailSignInForm";
import { configPrivate } from "@/shared/config/private.config";

interface SignInFormProps extends HTMLAttributes<HTMLDivElement> {}

export const SignInForm: FC<SignInFormProps> = async (props) => {
  const { className } = props;
  const providers = await getProviders();

  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth",
  );

  const testToken = configPrivate.TEST_EMAIL_TOKEN;

  return (
    <div className={cn("grid gap-6", className)}>
      <Suspense fallback={<div>Loading...</div>}>
        {testToken ? (
          <TestEmailSignInForm testToken={testToken} />
        ) : (
          <EmailSignInForm />
        )}
        <Divider />
        {oauthProviders.map((provider) => (
          <ProviderButton key={provider.id} provider={provider} />
        ))}
      </Suspense>
    </div>
  );
};
