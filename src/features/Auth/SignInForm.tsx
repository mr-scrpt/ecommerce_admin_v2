"use server";

import { FC, HTMLAttributes } from "react";
import { getProviders } from "next-auth/react";
import { cn } from "@/shared/ui/utils";
import { Divider } from "./_ui/Divider";
import { EmailSignInForm } from "./_ui/EmailSignInForm";
import { ProviderButton } from "./_ui/ProviderButton";
// import { EmailSignInForm } from "./_ui/email-sign-in-form";
// import { Divider } from "./_ui/divider";
// import { ProviderButton } from "./_ui/provider-button";
// import { privateConfig } from "@/shared/config/private";
// import { TestEmailSignInForm } from "./_ui/test-email-sign-in-form";

interface SignInFormProps extends HTMLAttributes<HTMLDivElement> {}

export const SignInForm: FC<SignInFormProps> = async (props) => {
  const { className } = props;
  const providers = await getProviders();

  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth",
  );

  // const testToken = privateConfig.TEST_EMAIL_TOKEN;

  return (
    <div className={cn("grid gap-6", className)}>
      {/* {testToken ? ( */}
      {/*   <TestEmailSignInForm testToken={testToken} /> */}
      {/* ) : ( */}
      <EmailSignInForm />
      {/* )} */}
      <Divider />
      {oauthProviders.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
};
