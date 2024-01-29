"use client";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { Github as IconGithub } from "lucide-react";
import { ClientSafeProvider } from "next-auth/react";
import { FC, HTMLAttributes } from "react";
import { useOAuthSignIn } from "../vm/useOauthSignIn";

interface ProviderButtonProps extends HTMLAttributes<HTMLDivElement> {
  provider: ClientSafeProvider;
}

const providerIcons: Record<string, JSX.Element> = {
  github: <IconGithub className="mr-2 h-4 w-4" />,
  // Добавьте другие провайдеры по мере необходимости
};

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
