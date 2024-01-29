"use client";
import { FC, HTMLAttributes } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface ProviderSessionProps extends HTMLAttributes<HTMLDivElement> {}

export const SessionProvider: FC<ProviderSessionProps> = (props) => {
  const { children } = props;
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
