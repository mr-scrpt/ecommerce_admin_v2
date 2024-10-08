"use client";
import { ThemeProvider } from "@/features/theme";
import { queryClient } from "@/shared/api/queryClient";
import { ComposeChildren } from "@/shared/lib/react";
import { Confirmation } from "@/widgets/confirmation";
import { ModalProvider } from "@/widgets/modal";
import { QueryClientProvider } from "@tanstack/react-query";
import { FC, HTMLAttributes } from "react";
import { ProviderWS } from "./providerWS";
import { SessionProvider } from "@/kernel/lib/nextauth";
import { InitUserData } from "../_init/initUserData";
import { ProviderTRPC } from "./providerTRPC";
import { ProviderNotice } from "./providerNotice";

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
