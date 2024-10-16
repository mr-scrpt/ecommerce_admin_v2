"use client";
import { ThemeProvider } from "@/features/theme";
import { SessionProvider } from "@/kernel/lib/nextauth";
import { ComposeChildren } from "@/shared/lib/react";
import { Confirmation } from "@/widgets/confirmation";
import { ModalProvider } from "@/widgets/modal";
import { FC, HTMLAttributes } from "react";
import { InitUserData } from "../_init/initUserData";
import { ProviderNotice } from "./providerNotice";
import { ProviderTRPC } from "./providerTRPC";
import { ProviderWS } from "./providerWS";

interface ProvidersRootProps extends HTMLAttributes<HTMLDivElement> {}

export const ProvidersRoot: FC<ProvidersRootProps> = (props) => {
  const { children } = props;
  return (
    <>
      <ComposeChildren>
        <ProviderTRPC />
        <ThemeProvider />
        <SessionProvider />
        {/* <QueryClientProvider client={queryClient} /> */}
        <ProviderWS />
        <Confirmation />
        <ModalProvider />
        <InitUserData />
        {children}
      </ComposeChildren>
      <ProviderNotice />
    </>
  );
};
