"use client";
import { useMutation } from "@tanstack/react-query";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface useOAuthSignInModelProps {
  provider: ClientSafeProvider;
}

export const useOAuthSignInModel = (props: useOAuthSignInModelProps) => {
  const { provider } = props;
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const oauthSignInMutation = useMutation({
    mutationFn: () =>
      signIn(provider.id, {
        callbackUrl: callbackUrl ?? undefined,
      }),
  });

  return {
    isPending: oauthSignInMutation.isPending,
    signIn: oauthSignInMutation.mutate,
  };
};
