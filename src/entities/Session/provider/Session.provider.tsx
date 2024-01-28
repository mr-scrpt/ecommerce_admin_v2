"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

import { FC, HTMLAttributes } from "react";

interface ProviderSessionProps extends HTMLAttributes<HTMLDivElement> {}

export const SessionProvider: FC<ProviderSessionProps> = (props) => {
  const { children } = props;
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
