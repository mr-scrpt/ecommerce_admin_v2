"use client";

import { FC, HTMLAttributes } from "react";
import { SpinnerFullPage } from "@/shared/ui/spinnerFullPage";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useAppSession } from "@/kernel/lib/nextauth";
import { AuthStatus } from "@/kernel/domain/auth/auth.type";

interface AuthorizedGuardProps extends HTMLAttributes<HTMLDivElement> {}

export const AuthorizedGuard: FC<AuthorizedGuardProps> = (props) => {
  const { children } = props;
  const session = useAppSession();

  const isUnauthenticated = session.status === AuthStatus.UNAUTHENTICATED;

  useEffect(() => {
    if (isUnauthenticated) {
      signIn();
    }
  }, [isUnauthenticated]);

  const isLoading =
    session.status === AuthStatus.LOADING ||
    session.status === AuthStatus.UNAUTHENTICATED;

  return (
    <>
      <SpinnerFullPage isLoading={isLoading} />
      {session.status === AuthStatus.AUTHENTICATED && children}
    </>
  );
};
