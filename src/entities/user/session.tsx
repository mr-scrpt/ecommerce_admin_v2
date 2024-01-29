"use client";
import { FC, HTMLAttributes } from "react";
import { useSession } from "next-auth/react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export const useAppSession = useSession;

export const useRole = () => {
  const session = useAppSession();
  return session?.data?.user?.role;
};

interface ProviderSessionProps extends HTMLAttributes<HTMLDivElement> {}

export const SessionProvider: FC<ProviderSessionProps> = (props) => {
  const { children } = props;
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
