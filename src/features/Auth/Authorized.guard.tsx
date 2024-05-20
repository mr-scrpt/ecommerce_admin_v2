"use client";

import { FC, HTMLAttributes } from "react";
import { SpinnerFullPage } from "@/shared/ui/spinnerFullPage";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useAppSession } from "@/kernel/lib/nextauth";

interface AuthorizedGuardProps extends HTMLAttributes<HTMLDivElement> {}

export const AuthorizedGuard: FC<AuthorizedGuardProps> = (props) => {
  const { children } = props;
  const session = useAppSession();

  const isUnauthenticated = session.status === "unauthenticated";

  useEffect(() => {
    if (isUnauthenticated) {
      signIn();
    }
  }, [isUnauthenticated]);

  const isLoading =
    session.status === "loading" || session.status === "unauthenticated";

  return (
    <>
      <SpinnerFullPage isLoading={isLoading} />
      {session.status === "authenticated" && children}
    </>
  );
};
