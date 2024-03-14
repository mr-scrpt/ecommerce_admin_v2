"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

interface ProviderSessionProps {
  children?: ReactNode;
}

export const SessionProvider: FC<ProviderSessionProps> = (props) => {
  const { children } = props;
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
