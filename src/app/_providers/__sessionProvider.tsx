"use client";
import {
  getAppSessionServer,
  getAppSessionServerOrRedirect,
  getAppSessionStrictServer,
} from "@/entities/user/user.server";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { FC, HTMLAttributes } from "react";

interface ProviderWSProps extends HTMLAttributes<HTMLDivElement> {}

interface SessionExtraData {
  data?: any;
  getAppSessionServer: () => Promise<Session | null>;
  getAppSessionStrictServer: () => Promise<Session>;
  getAppSessionServerOrRedirect: () => Promise<Session>;
}
const sessionExtraData = createStrictContext<SessionExtraData>();

export const ProviderSessionUser: FC<ProviderWSProps> = (props) => {
  const { children } = props;
  return (
    <NextAuthSessionProvider>
      <sessionExtraData.Provider
        value={{
          getAppSessionServer: getAppSessionServer,
          getAppSessionStrictServer: getAppSessionStrictServer,
          getAppSessionServerOrRedirect: getAppSessionServerOrRedirect,
        }}
      >
        {children}
      </sessionExtraData.Provider>
    </NextAuthSessionProvider>
  );
};

export const useSessionExtraData = () => useStrictContext(sessionExtraData);
