"use client";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { ClientSafeProvider } from "next-auth/react";
import { FC, HTMLAttributes } from "react";
import { useOAuthSignIn } from "../vm/useOauthSignIn";
import { providerIcons } from "./providerIconList";

interface ProviderButtonProps extends HTMLAttributes<HTMLDivElement> {
  provider: ClientSafeProvider;
}

export const ProviderButton: FC<ProviderButtonProps> = (props) => {
  const { provider } = props;

  const oauthSignIn = useOAuthSignIn({ provider });

  const getIcon = (provider: ClientSafeProvider) => {
    return providerIcons[provider.id] || null;
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={oauthSignIn.isPending}
      onClick={() => oauthSignIn.signIn()}
    >
      {oauthSignIn.isPending ? (
        <Spinner className="mr-2 h-4 w-4 animate-spin" aria-label="Вход" />
      ) : (
        getIcon(provider)
      )}
      {provider.name}
    </Button>
  );
};
